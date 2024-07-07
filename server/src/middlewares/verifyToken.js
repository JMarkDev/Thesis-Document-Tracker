const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyToken = (req, res, next) => {
  try {
    const token = req.cookies.accessToken;
    // if (!token) {
    //   return res.status(401).json({ error: "Unauthorized" });
    // }

    jwt.verify(token, process.env.ACCESS_TOKEN, (err, decoded) => {
      // if (err) {
      //   console.log(err);
      //   // return res.status(401).json({ error: "Unauthorized" });
      // }

      req.user = decoded;
      // console.log(decoded);
      next();
    });
    // return res.json(token);
  } catch (error) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
};

module.exports = verifyToken;
