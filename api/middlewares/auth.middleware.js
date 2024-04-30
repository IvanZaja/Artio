const jwt = require("jsonwebtoken");
const Host = require("../models/host.model");
const Company = require("../models/company.model");

module.exports.checkAuth = (req, res, next) => {
  const [schema, token] = req.headers?.authorization.split(' ');
  switch (schema.toUpperCase()) {
    case 'BEARER':
      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          return res.status(401).json({ message: err.message });
        }

        const sub = decoded.sub;

        Host.findById(sub)
          .then((host) => {
            if (host) {
              req.host = host;
              next();
            } else {
              res.status(401).json({ message: "Unauthorized" });
            }
          })
          .catch(next);

        Company.findById(sub)
        .then((company) => {
          if (company) {
            req.company = company;
            next();
          } else {
            res.status(401).json({ message: "Unauthorized" });
          }
        })
        .catch(next);
      });
      break;
    default:
      res.status(401).json({ message: `Unsupported authorization schema ${schema}` });
  }
  
};