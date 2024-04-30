const Host = require("../models/host.model");
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');

module.exports.create = (req, res, next) => {
    Host.create(req.body)
      .then((host) => {
        res.json(host);
      })
      .catch((err) => {
        if (err instanceof mongoose.Error.ValidationError) {
          res.status(400).json(err.errors);
        } else {
          next(err);
        }
      });
  };

module.exports.login = (req, res, next) => {
    Host.findOne({ email: req.body.email })
        .then((host) => {
            if (host) {
                host
                .checkPassword(req.body.password)
                .then((match) => {
                    if (match) {
                    const accessToken = jwt.sign(
                        {
                        sub: host.id,
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
    Host.findById(req.params.id)
      .then((host) => {
        if (host) {
          res.json(host);
        } else {
          res.status(404).json({ message: "Host not found" });
        }
      })
      .catch(next);
};