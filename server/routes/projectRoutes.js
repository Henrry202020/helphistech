import express from 'express'
import checkAuth from '../middleware/checkAuth.js'
import { getProject, getProjects, createProject, changeProjectState, cancelProject } from '../controllers/projectController.js'

const router = express.Router()

// Get specific project
router.post('/get', checkAuth, getProject)

router.route('')
    // Get all projects
    .get(checkAuth, getProjects)
    // Create project
    .post(createProject)
    // Change project state
    .put(checkAuth, changeProjectState)
    // Cancel project
    .delete(checkAuth, cancelProject);

export default router