const express = require('express');
const router = express.Router();
const auth = require("../middlewares/auth.middleware");
const users = require('../controllers/user.controller');
const projects = require('../controllers/project.controller');
const requests= require('../controllers/request.controller');

router.post('/users', users.create);
router.post('/login', users.login);
router.get('/users/:id', auth.checkAuth, users.details);
router.get('/users', users.allUsers);

router.post('/projects', auth.checkAuth, projects.create);
router.get('/projects/:id', projects.details);
router.get('/projects', projects.list);

router.post('/requests', auth.checkAuth, requests.create);
//router.update('/requests/:id', auth.checkAuth, requests.update);

module.exports = router;