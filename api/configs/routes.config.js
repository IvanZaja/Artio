const express = require('express');
const router = express.Router();
const auth = require("../middlewares/auth.middleware");
const users = require('../controllers/user.controller');
const projects = require('../controllers/project.controller');
const requests= require('../controllers/request.controller');

router.post('/user', users.create);
router.post('/login', users.login);
router.get('/user/:id', auth.checkAuth, users.details);
router.get('/user', users.allUsers);

router.post('/projects',auth.checkAuth, projects.create);
router.get('/projects/:id', projects.details);
router.get('/projects', projects.list);

router.post('/requests', requests.create);
router.get('/requests/:id', projects.details);
router.get('/requests', projects.list);

module.exports = router;