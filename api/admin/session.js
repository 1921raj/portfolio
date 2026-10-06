import { handleAdminAuth } from '../../server/adminAuth.js';

export default function session(req, res) {
    return handleAdminAuth(req, res, 'session');
}
