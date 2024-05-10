const Request = require("../models/request.model");
const mongoose = require("mongoose");

module.exports.create = (req, res, next) => {
    Request.create({title: req.body.title, message: req.body.message, company: req.body.company, project: req.body.project, owner: req.user.id})
        .then((request) => {
            res.json(request);
        })
        .catch((err) => {
            if (err instanceof mongoose.Error.ValidationError) {
                res.status(400).json(err.errors);
            } else {
                next(err);
            }
        })
};

module.exports.update = (req, res, next) => {
    const requestId = req.params.id;
    
    Request.findByIdAndUpdate(requestId, req.body.status)
        .then((request) => {
            if (request) {
                res.json(request);
            } else {
                res.status(404).json({ message: "Request not found" });
            }
        })
        .catch(next);
};