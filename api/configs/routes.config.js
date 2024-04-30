const express = require('express');
const router = express.Router();
const hosts = require('../controllers/host.controller');
const companies = require('../controllers/company.controller');
const projects = require('../controllers/project.controller');

router.post('/hosts', hosts.create);
router.post('/hosts-login', hosts.login);

router.post('/companies', companies.create);
router.post('/companies-login', companies.login);

router.post('/projects', projects.create);

module.exports = router;