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
const officeRoute = require("./src/routes/officeRoute");
const notificationRoute = require("./src/routes/notificationRoute");
const documentRoute = require("./src/routes/documentRoute");
const trackingNumberRoute = require("./src/routes/trackDocumentRoute");
const documentWorkflowRoute = require("./src/routes/documentWorkflow");
const chatBotRoute = require("./src/routes/chatbotRoute");
const analyticsRoute = require("./src/routes/analiticsRoute");
const uploadFilesRoute = require("./src/routes/uploadFilesRoute");
const campusAndDesignationRoute = require("./src/routes/esuCampus&DesignationRoute");

const app = express();
const PORT = process.env.PORT || 5000;

const corsOptions = {
  // origin: ["http://localhost:5173"],
  origin: [
    "http://192.168.1.8:3000",
    "http://localhost:3000",
    "http://localhost:5173",
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

// Middleware setup
app.use(cors(corsOptions));
app.use(express.json());
// built in middleware the handle urlencoded data
// in other words form data;
// 'content-type: application/x-www-form-urlencoded'
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static("public"));
app.use("/uploads", express.static("uploads"));
app.get("/uploads/:filename", (req, res) => {
  const filename = req.params.filename;
  res.sendFile(`${__dirname}/uploads/${filename}`);
});

// public routes no token required
app.use("/files", uploadFilesRoute);
app.use("/auth", authRoute);
app.use("/document", trackingNumberRoute);
app.use("/chatbot", chatBotRoute);
app.use("/campus-designation", campusAndDesignationRoute);

// refresh token route
app.post("/refresh", refreshToken, async (req, res) => {
  return res.json({ message: "refresh" });
});

//protected route
app.use("/protected", verifyToken, async (req, res) => {
  return res.json({
    user: req.user,
    message: "You are authorized to access this protected resources.",
  });
});

// check verify user middleware
app.use(verifyToken);

app.use("/users", userRoute);
app.use("/office", officeRoute);
app.use("/document", documentRoute);
app.use("/workflow", documentWorkflowRoute);
app.use("/notification", notificationRoute);
app.use("/analytics", analyticsRoute);

app.get("/");
// Server setup
const server = http.createServer(app);

// Socket setup
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000", "http://localhost:5173"],
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

  socket.on("upload_document", (data) => {
    socket.broadcast.emit("success_upload", data);
    console.log(data);
  });

  socket.on("received_document", (data) => {
    socket.broadcast.emit("success_received", data);
  });

  socket.on("add_deadline", (data) => {
    socket.broadcast.emit("success_deadline", data);
  });

  socket.on("new_user", (data) => {
    socket.broadcast.emit("success_user", data);
  });
});

// if (process.env.DEVELOPMENT !== "test") {
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  database.authenticate();
  database
    .sync({ force: false }) // delelte all data in the database
    // .sync({ alter: true })
    .then(() => {
      console.log("Database connected successfully");
    })
    .catch((error) => {
      console.error("Error connecting to the database: ", error);
    });
});
// }

module.exports = app;
// // add seeders and use id that already exit in database when it have foreignkey
// const express = require("express");
// const database = require("./src/configs/database");
// const bodyParser = require("body-parser");
// const cookieParser = require("cookie-parser");
// const { Server } = require("socket.io");
// const http = require("http");
// const cors = require("cors");

// const verifyToken = require("./src/middlewares/verifyToken");
// const refreshToken = require("./src/middlewares/refreshToken");
// const authRoute = require("./src/routes/authRoute");
// const userRoute = require("./src/routes/userRoute");
// const officeRoute = require("./src/routes/officeRoute");
// const notificationRoute = require("./src/routes/notificationRoute");
// const documentRoute = require("./src/routes/documentRoute");
// const trackingNumberRoute = require("./src/routes/trackDocumentRoute");
// const documentWorkflowRoute = require("./src/routes/documentWorkflow");
// const chatBotRoute = require("./src/routes/chatbotRoute");
// const analyticsRoute = require("./src/routes/analiticsRoute");
// const uploadFilesRoute = require("./src/routes/uploadFilesRoute");

// const app = express();
// const PORT = process.env.PORT || 5000;

// const corsOptions = {
//   // origin: ["http://localhost:5173"],
//   origin: [
//     "https://wmsu-esu-document-tracking.com.tarakabataan.com",
//     "https://www.wmsu-esu-document-tracking.com.tarakabataan.com",
//   ],
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   credentials: true,
// };

// // Middleware setup
// app.use(cors(corsOptions));
// app.use(express.json());
// // built in middleware the handle urlencoded data
// // in other words form data;
// // 'content-type: application/x-www-form-urlencoded'
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());

// app.use(express.static("public"));
// app.use("/uploads", express.static("uploads"));
// app.get("/uploads/:filename", (req, res) => {
//   const filename = req.params.filename;
//   res.sendFile(`${__dirname}/uploads/${filename}`);
// });

// // public routes no token required
// app.use("/files", uploadFilesRoute);
// app.use("/auth", authRoute);
// app.use("/document", trackingNumberRoute);
// app.use("/chatbot", chatBotRoute);

// // refresh token route
// app.post("/refresh", refreshToken, async (req, res) => {
//   return res.json({ message: "refresh" });
// });

// //protected route
// app.use("/protected", verifyToken, async (req, res) => {
//   return res.json({
//     user: req.user,
//     message: "You are authorized to access this protected resources.",
//   });
// });

// // check verify user middleware
// app.use(verifyToken);

// app.use("/users", userRoute);
// app.use("/office", officeRoute);
// app.use("/document", documentRoute);
// app.use("/workflow", documentWorkflowRoute);
// app.use("/notification", notificationRoute);
// app.use("/analytics", analyticsRoute);

// app.get("/");
// // Server setup
// const server = http.createServer(app);

// // Socket setup
// const io = new Server(server, {
//   cors: {
//     origin: [
//       "https://wmsu-esu-document-tracking.com.tarakabataan.com",
//       "https://www.wmsu-esu-document-tracking.com.tarakabataan.com",
//     ],
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true,
//   },
//   allowEIO3: true,
// });

// io.on("connection", (socket) => {
//   console.log("User connected", socket.id);

//   socket.on("disconnect", () => {
//     console.log("User disconnected");
//   });

//   socket.on("upload_document", (data) => {
//     socket.broadcast.emit("success_upload", data);
//     console.log(data);
//   });

//   socket.on("received_document", (data) => {
//     socket.broadcast.emit("success_received", data);
//   });

//   socket.on("add_deadline", (data) => {
//     socket.broadcast.emit("success_deadline", data);
//   });
// });

// // if (process.env.DEVELOPMENT !== "test") {
// server.listen(3003, () => {
//   console.log(`Server is running on port ${3003}`);
//   database.authenticate();
//   database
//     .sync({ force: false }) // delelte all data in the database
//     // .sync({ alter: true })
//     .then(() => {
//       console.log("Database connected successfully");
//     })
//     .catch((error) => {
//       console.error("Error connecting to the database: ", error);
//     });
// });
// // }

// module.exports = app;
// // add seeders and use id that already exit in database when it have foreignkey
