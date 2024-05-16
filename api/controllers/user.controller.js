const User = require("../models/user.model");
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
const Project = require("../models/project.model");

module.exports.create = (req, res, next) => {
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