const Company = require('../models/company.model');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

module.exports.create = (req, res, next) => {
    Company.create(req.body)
        .then((company) => {
            res.json(company);
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
    Company.findOne({ email: req.body.email })
        .then((company) => {
            if (company) {
                company
                .checkPassword(req.body.password)
                .then((match) => {
                    if (match) {
                    const accessToken = jwt.sign(
                        {
                        sub: company.id,
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