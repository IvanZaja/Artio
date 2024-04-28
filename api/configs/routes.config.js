const express = require('express');
const router = express.Router();
const users = require("../controllers/users.controller");

router.post("/users", users.create);

module.exports = router;