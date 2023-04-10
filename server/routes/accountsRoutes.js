import express from 'express'
import checkAuth from '../middleware/checkAuth.js'
import checkSuperAdmin from '../middleware/checkSuperAdmin.js'
import { getAccounts, getAccount, modifyAccount, register } from '../controllers/accountsController.js'

const router = express.Router()

router.route('')
    // Get all accounts
    .get(checkAuth, checkSuperAdmin, getAccounts)
    // Modify account
    .put(checkAuth, checkSuperAdmin, modifyAccount)
    // Register account
    .post(checkAuth, checkSuperAdmin, register);
// Get specific account
router.post('/account', checkAuth, checkSuperAdmin, getAccount)

export default router