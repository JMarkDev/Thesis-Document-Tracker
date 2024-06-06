const jwt = require("jsonwebtoken");
const refreshToken = (req, res, next) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    jwt.verify(refreshToken, "refresh_token_secret", (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      //   console.log(decoded.email);
      const accessToken = jwt.sign(
        { email: decoded.email },
        "access_token_secret",
        {
          expiresIn: "30m",
        }
      );

      // Set a secure HTTP-only cookie
      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        maxAge: 30 * 60 * 1000, // 30 minutes
      });

      req.user = decoded;
      next();
      return res.status(200).json(accessToken);
    });
  } catch (error) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
};

module.exports = refreshToken;
