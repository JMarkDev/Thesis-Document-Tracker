const jwt = require("jsonwebtoken");
require("dotenv").config();

const refreshToken = (req, res, next) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN, (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      const accessToken = jwt.sign(
        { email: decoded.email },
        process.env.ACCESS_TOKEN,
        {
          expiresIn: "30m",
        }
      );
      console.log(accessToken, "refresh");
      // Set a secure HTTP-only cookie
      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        maxAge: 30 * 60 * 1000, // 30 minutes
      });

      req.user = decoded;
      // next();
      return res.status(200).json({ accessToken });
    });
  } catch (error) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
};

module.exports = refreshToken;
