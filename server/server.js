const express = require("express");
const database = require("./src/configs/database");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { Server } = require("socket.io");
const app = express();
const http = require("http");
const PORT = process.env.PORT || 5000;
const cors = require("cors");

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

  // handle event when client disconnects
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });

  // socket.on("send_notification", (data) => {
  //   socket.broadcast.emit("receive_notification", data);
  // });

  // socket.on("send_attendee_notification", (data) => {
  //   socket.broadcast.emit("receive_attendee_notification", data);
  // });
});

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
