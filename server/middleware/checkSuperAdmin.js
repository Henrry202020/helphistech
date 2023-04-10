import jwt from 'jsonwebtoken'
import User from '../models/User.js'

/**
 * Check if the user has superadmin permissions
 * @param req - request object
 * @param res - response object
 * @param next - callback
*/

const checkSuperAdmin = async (req, res, next) => {
    const user = req.user;

    if(user.permissions != 'superadmin') {
        return res.status(404).json({ msg: 'Insufficient permissions' })
    }

    next();
}

export default checkSuperAdmin