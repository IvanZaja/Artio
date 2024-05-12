const Project = require('../models/project.model');
const User = require("../models/user.model");
const mongoose = require('mongoose');

module.exports.create = (req, res, next) => {
    Project.create({ name: req.body.name, description: req.body.description, beneficts: req.body.beneficts, additionalDetails: req.body.additionalDetails, images: req.body.images, coverImg: req.body.coverImg, country: req.body.country, placeName: req.body.placeName, goal: req.body.goal, owner: req.user.id, collaborators: req.body.collaborators})
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
    const { lat, lng, category, limit, page = 0 } = req.query;
    console.info({limit})
    const criterial = {};
    if (category) criterial.category = category;

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
      .limit(limit ?? 0)
      .then((projects) => res.json(projects))
      .catch(next);
  };

module.exports.update = (req, res, next) => {
  const projectId = req.params.id;
  
  Project.findByIdAndUpdate(projectId, {amountReceived: req.body.amountReceived})
      .then((project) => {
          if (project) {
              res.json(project);
          } else {
              res.status(404).json({ message: "Project not found" });
          }
      })
      .catch(next);
};