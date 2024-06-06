const userModel = require("../models/userModel");
const otpController = require("../controllers/otpController");
const date = require("date-and-time");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const sequelize = require("../configs/database");
const saltsRounds = 10;

const alreadyRegistered = async (email) => {
  return await userModel.findOne({
    where: {
      email: email,
      status: "verified",
    },
  });
};

const handleRegister = async (req, res) => {
  const {
    image,
    firstName,
    lastName,
    middleInitial,
    email,
    designation,
    esuCampus,
    officeName,
    role,
    password,
    status,
  } = req.body;

  try {
    const verifyUser = await alreadyRegistered(email);
    if (verifyUser) {
      return res.status(400).json({ message: "User already exists" });
    } else {
      await userModel.destroy({
        where: {
          email: email,
          status: "pending",
        },
      });

      // send OTP to email
      await otpController.postOTP(email);

      const hashPassword = await bcrypt.hash(password, saltsRounds);

      await userModel.create({
        image: image,
        firstName: firstName,
        lastName: lastName,
        middleInitial: middleInitial,
        email: email,
        designation: designation,
        esuCampus: esuCampus,
        officeName: officeName,
        role: role,
        password: hashPassword,
        status: status,
        createdAt: new Date(),
      });

      return res.status(201).json({
        status: "success",
        message: `Verification OTP sent to ${email}`,
      });
    }
  } catch (error) {
    return res.status(500).json({ Error: "Register error in server" });
  }
};

const handleLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // const verifyUser = await alreadyRegistered(email);
    const user = await userModel.findOne({
      where: {
        email: email,
        status: "verified",
      },
    });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const matchPassword = await bcrypt.compare(password, user.password);

    if (matchPassword) {
      // const token = jwt.sign({ email: email }, process.env.SECRET_KEY, {
      //   expiresIn: "30m",
      // });

      const accessToken = jwt.sign({ email: email }, process.env.ACCESS_TOKEN, {
        expiresIn: "30m",
      });

      const refreshToken = jwt.sign(
        { email: email },
        process.env.REFRESH_TOKEN,
        {
          expiresIn: "30m",
        }
      );

      // Set a secure HTTP-only cookie
      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        maxAge: 30 * 60 * 1000, // 30 minutes
      });

      // Set a secure HTTP-only cookie
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        maxAge: 30 * 60 * 1000, // 30 minutes
      });

      return res.status(200).json({
        status: "success",
        message: "Login Successfully!",
      });
    } else {
      return res.status(400).json({
        status: "error",
        message: "Invalid email or password",
      });
    }
  } catch (error) {
    return res.status(500).json({ Error: "Login error in server" });
  }
};

const handleLogout = (req, res) => {
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");
  res.status(200).json({ message: "Logout successful" });
};

module.exports = {
  handleRegister,
  handleLogin,
  handleLogout,
};
