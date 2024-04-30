const Project = require('../models/project.model');
const mongoose = require('mongoose');

module.exports.create = (req, res, next) => {
    Project.create(req.body)
        .then((project) => {
            res.json(project);
        })
        .catch((err) => {
            if (err instanceof mongoose.Error.ValidationError) {
                res.status(400).json(err.errors);
            } else {
                next(err);
            }
        });
};