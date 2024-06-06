const jwt = require("jsonwebtoken");
const verifyToken = (req, res, next) => {
  try {
    // const accessToken = req.cookies.accessToken;
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    jwt.verify(token, "access_token_secret", (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      req.user = decoded;
      // console.log(decoded);
      next();
    });
    return res.json(token);
  } catch (error) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
};

module.exports = verifyToken;
