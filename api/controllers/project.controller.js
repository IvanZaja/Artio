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

module.exports.details = (req, res, next) => {
    Project.findById(req.params.id)
      .then((project) => {
        if (project) {
          res.json(project);
        } else {
          res.status(404).json({ message: "Project not found" });
        }
      })
      .catch(next);
};

module.exports.list = (req, res, next) => {
    const { lat, lng, limit = 20, page = 0 } = req.query;
    const criterial = {};
    if (lat && lng) {
      criterial.location = {
       $near: {
         $geometry: {
            type: "Point" ,
           coordinates: [lng, lat]
         },
         $maxDistance: 15000,
         $minDistance: 0
       }
     }
    }
    Project.find(criterial)
      .sort({ _id: -1 })
      .skip(page * limit)
      .limit(limit)
      .then((projects) => res.json(projects))
      .catch(next);
  };