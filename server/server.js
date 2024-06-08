const express = require("express");
const database = require("./src/configs/database");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { Server } = require("socket.io");
const http = require("http");
const cors = require("cors");

const verifyToken = require("./src/middlewares/verifyToken");
const refreshToken = require("./src/middlewares/refreshToken");
const authRoute = require("./src/routes/authRoute");
const userRoute = require("./src/routes/userRoute");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware setup
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(express.static("public"));
app.use("/uploads", express.static("uploads"));
app.get("/uploads/:filename", (req, res) => {
  const filename = req.params.filename;
  res.sendFile(`${__dirname}/uploads/${filename}`);
});

// public routes no token required
app.use("/auth", authRoute);

// refresh token route
app.use("/refresh", refreshToken, async (req, res) => {
  return res.json({ message: "refresh" });
});

//protected route
app.use("/protected", verifyToken, async (req, res) => {
  return res.json({
    message: "You are authorized to access this protected resources.",
  });
});

app.use("/user", userRoute);

// Server setup
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  },
  allowEIO3: true,
});

io.on("connection", (socket) => {
  console.log("User connected", socket.id);

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

if (process.env.DEVELOPMENT !== "test") {
  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    database.authenticate();
    database
      .sync({ force: false })
      .then(() => {
        console.log("Database connected successfully");
      })
      .catch((error) => {
        console.error("Error connecting to the database: ", error);
      });
  });
}

module.exports = app;
