import { handleAdminAuth } from '../../server/adminAuth.js';

export default function logout(req, res) {
    return handleAdminAuth(req, res, 'logout');
}
