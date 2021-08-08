const jwt = require("jsonwebtoken");
const createError = require("http-errors");
const { Promise } = require("mongoose");

module.exports = {
  createToken: (userId) => {
    return new Promise((resolve, reject) => {
      const payload = {};
      const secret = process.env.ACCESS_TOKEN_SECRET;
      const options = {
        expiresIn: "1y",
        audience: userId,
      };
      jwt.sign(payload, secret, options, (err, token) => {
        if (err) {
          reject(createError.InternalServerError());
        }
        resolve(token);
      });
    });
  },

  verifyAccessToken: (req, res, next) => {
    // console.log(req.headers["authorization"]);
    if (!req.headers["authorization"]) return next(res.sendStatus(401));

    // const authHeader = req.headers["authorization"];
    // const token = authHeadcookieser && authHeader.split(" ")[1];

    // get token from client side
    const token = req.headers.authorization;

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
      if (err) {
        if (err.name === "jsonWebTokenError") {
          return res.sendStatus(401);
        } else {
          return next(res.status(401).send(err.message));
        }
      }
      req.payload = payload;
      next();
    });
  },
};
