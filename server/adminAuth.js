import { createHmac, createHash, timingSafeEqual } from 'node:crypto';
import { Buffer } from 'node:buffer';
import process from 'node:process';

const cookieName = 'portfolio_admin_session';
const sessionDurationSeconds = 8 * 60 * 60;

function sendJson(res, status, body) {
    res.statusCode = status;
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.setHeader('Cache-Control', 'no-store');
    res.end(JSON.stringify(body));
}

function getCookie(req, name) {
    const cookieHeader = req.headers.cookie || '';
    for (const part of cookieHeader.split(';')) {
        const separator = part.indexOf('=');
        if (separator < 0 || part.slice(0, separator).trim() !== name) continue;
        try {
            return decodeURIComponent(part.slice(separator + 1).trim());
        } catch {
            return '';
        }
    }
    return '';
}

function sessionSecret() {
    const secret = process.env.ADMIN_SESSION_SECRET;
    return typeof secret === 'string' && Buffer.byteLength(secret) >= 32 ? secret : null;
}

function signExpiry(expiry, secret) {
    return createHmac('sha256', secret).update(expiry).digest('base64url');
}

function isAuthenticated(req, secret) {
    const token = getCookie(req, cookieName);
    const separator = token.indexOf('.');
    if (separator < 1) return false;

    const expiry = token.slice(0, separator);
    const signature = token.slice(separator + 1);
    if (!/^\d+$/.test(expiry) || Number(expiry) <= Math.floor(Date.now() / 1000)) return false;

    const expected = signExpiry(expiry, secret);
    const suppliedHash = createHash('sha256').update(signature).digest();
    const expectedHash = createHash('sha256').update(expected).digest();
    return timingSafeEqual(suppliedHash, expectedHash);
}

function cookieOptions(req) {
    const isSecure = process.env.NODE_ENV === 'production'
        || req.headers['x-forwarded-proto'] === 'https';
    return `Path=/; HttpOnly; SameSite=Strict${isSecure ? '; Secure' : ''}`;
}

async function readJsonBody(req) {
    if (req.body && typeof req.body === 'object') return req.body;

    let body = '';
    for await (const chunk of req) {
        body += chunk;
        if (body.length > 4096) throw new Error('Request body is too large.');
    }
    if (!body) return {};
    return JSON.parse(body);
}

export async function handleAdminAuth(req, res, action) {
    res.setHeader('X-Content-Type-Options', 'nosniff');

    if (action === 'session' && req.method === 'GET') {
        const secret = sessionSecret();
        sendJson(res, 200, {
            authenticated: secret && process.env.ADMIN_PASSWORD
                ? isAuthenticated(req, secret)
                : false,
        });
        return;
    }

    if (action === 'logout' && req.method === 'POST') {
        res.setHeader('Set-Cookie', `${cookieName}=; ${cookieOptions(req)}; Max-Age=0`);
        sendJson(res, 200, { authenticated: false });
        return;
    }

    if (action !== 'login' || req.method !== 'POST') {
        sendJson(res, 404, { error: 'Not found.' });
        return;
    }

    const configuredPassword = process.env.ADMIN_PASSWORD;
    const secret = sessionSecret();
    if (!configuredPassword || !secret) {
        sendJson(res, 503, { error: 'Admin authentication is not configured on the server.' });
        return;
    }

    let body;
    try {
        body = await readJsonBody(req);
    } catch {
        sendJson(res, 400, { error: 'Invalid request body.' });
        return;
    }

    const password = typeof body.password === 'string' ? body.password : '';
    if (Buffer.byteLength(password) > 1024) {
        sendJson(res, 400, { error: 'Invalid password.' });
        return;
    }

    const suppliedHash = createHash('sha256').update(password).digest();
    const expectedHash = createHash('sha256').update(configuredPassword).digest();
    if (!timingSafeEqual(suppliedHash, expectedHash)) {
        sendJson(res, 401, { authenticated: false });
        return;
    }

    const expiry = String(Math.floor(Date.now() / 1000) + sessionDurationSeconds);
    res.setHeader(
        'Set-Cookie',
        `${cookieName}=${expiry}.${signExpiry(expiry, secret)}; ${cookieOptions(req)}; Max-Age=${sessionDurationSeconds}`,
    );
    sendJson(res, 200, { authenticated: true });
}
