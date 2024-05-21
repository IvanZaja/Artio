const express = require('express');
const router = express.Router();
const auth = require("../middlewares/auth.middleware");
const users = require('../controllers/user.controller');
const projects = require('../controllers/project.controller');
const requests = require('../controllers/request.controller');
const { storage } = require('../configs/storage.config');

router.post('/users', storage.single('avatarImage'), users.create);
router.post('/login', users.login);
router.get('/users/:id', auth.checkAuth, users.details);
router.get('/users', users.allUsers);
router.patch('/users/:id', auth.checkAuth, users.setGoal);

router.post('/projects', auth.checkAuth, projects.create);
router.get('/projects/:id', projects.details);
router.get('/projects', projects.list);
router.patch('/projects/:id', auth.checkAuth, projects.update);

router.patch('/projects/:id/user', auth.checkAuth, users.updateTokens); 


router.post('/projects/:id/investments', auth.checkAuth, users.investments);

router.post('/requests', auth.checkAuth, requests.create);
router.patch('/requests/:id', auth.checkAuth, requests.update);



module.exports = router;