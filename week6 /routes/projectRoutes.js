// routes/projectRoutes.js
const express = require('express');
const { getProjects } = require('../controller/projectController');  // Updated import for controller
const router = express.Router();

// Route to fetch all projects from the database
router.get('/projects', getProjects);

module.exports = router;  // Export the router
