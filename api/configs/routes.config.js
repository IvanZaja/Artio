const express = require('express');
const router = express.Router();
const auth = require("../middlewares/auth.middleware");
const users = require('../controllers/user.controller');
const projects = require('../controllers/project.controller');

router.post('/user', users.create);
router.post('/login', users.login);
router.get('/user/:id', users.details);
router.get('/profile', auth.checkAuth, users.profile);

router.post('/projects', projects.create);
router.get('/projects/:id', projects.details);
router.get('/projects', projects.list);

module.exports = router;