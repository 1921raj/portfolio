import { handleAdminAuth } from '../../server/adminAuth.js';

export default function login(req, res) {
    return handleAdminAuth(req, res, 'login');
}
