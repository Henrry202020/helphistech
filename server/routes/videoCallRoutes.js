import express from 'express'
import checkAuth from '../middleware/checkAuth.js'
import { createVideoCall } from '../controllers/videoCallController.js'

const router = express.Router()

// Create videocall
router.post('/', createVideoCall);

export default router