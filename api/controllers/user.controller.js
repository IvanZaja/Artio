const User = require("../models/user.model");
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
const Project = require("../models/project.model");
const {uploadPDF} = require('../configs/storage.config');
const {generateDocument} = require('../services/generateDocument')
const fs = require('fs');
const path = require('path'); 


module.exports.create = (req, res, next) => {
    if (req.file) {
    req.body.avatar = req.file.path;
    }

    User.create(req.body)
        .then((user) => {
            res.json(user);
        })
        .catch((err) => {
            if (err instanceof mongoose.Error.ValidationError) {
                res.status(400).json(err.errors);
            } else {
                next(err);
            }
        })
};

module.exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then((user) => {
            if (user) {
                user
                .checkPassword(req.body.password)
                .then((match) => {
                    if (match) {
                    const accessToken = jwt.sign(
                        {
                        sub: user.id,
                        exp: Date.now() / 1000 + 3600,
                        },
                        process.env.JWT_SECRET
                    );

                    res.json({ accessToken });
                    } else {
                    res.status(401).json({ message: "invalid password" });
                    }
                })
                .catch(next);
            } else {
                res.status(401).json({ message: "invalid email" });
            }
        })
        .catch(next);
};

module.exports.details = (req, res, next) => {
    const userId = req.params.id;
    if (userId === 'me') {
        res.json(req.user);
    } else {
        User.findById(req.params.id)
            .then((user) => {
                if (user) {
                res.json(user);
                } else {
                res.status(404).json({ message: "User not found" });
                }
            })
            .catch(next);
    }
};

module.exports.allUsers = (req, res, next) => {
    const { limit } = req.query;
    console.info({limit})

    User.find()
    .limit(limit ?? 0)
    .then((users) => {
            if (users) {
                res.json(users);
            } else {
                res.status(404).json({ message: "User not found" });
            }
        })
        .catch(next);
}

module.exports.investments = (req, res, next) => {
    const data = req.body;
    const userId = req.user.id;

    const document = generateDocument(data)
        
    uploadPDF(document)
        .then(result => {
            console.log(result.url)
            User.findById(userId)
                .then((user) => {
                    user.docs.push(result.url)
                    user.save()
                        .then((updatedUser) => {
                            res.json(updatedUser);
                            fs.unlink(path.join('../api/', document), err => {
                            if (err) {
                                console.error("Error deleting file:", err);
                            }
                        });
                        })
                        .catch(next);
                })
                .catch(next);
        })
        .catch(next);
    
    
}

module.exports.updateTokens = (req, res, next) => {
    const userId = req.user.id;

  User.findById(userId)
    .then((user) => {
      if (user) {
        
          user.tokens = req.body.tokens;
          user.save()
            .then((updatedTokens) => {
              res.json(updatedTokens);
            })
            .catch(next);
        
      } else {
        res.status(404).json({ message: "User not found" });
      }
    })
    .catch(next);
}

module.exports.setGoal = (req, res, next) => {
    const userId = req.user.id;

    User.findById(userId)
        .then((user) => {
        if (user) {
            console.log(req.body)
            user.monthGoal = req.body.monthGoal;
            user.save()
            .then((updatedGoal) => {
              res.json(updatedGoal);
            })
            .catch(next);
            
        } else {
            res.status(404).json({ message: "User not found" });
        }
        })
        .catch(next);
}