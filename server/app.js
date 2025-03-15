const express = require("express");
const bodyParser = require("body-parser");

const { Server } = require("socket.io");
const { ValidationError } = require("express-validation");
const { createServer } = require("node:http");

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

let users = [];

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false })); // for parsing application/x-www-form-urlencoded

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

io.on("connection", (socket) => {
  socket.on("join", (username) => {
    socket.username = username;
    users[username] = socket.id;
    socket.emit("joined", socket.username);
    console.log(`${username} sohbete katıldı.`);
  });

  socket.on("message", (message, from, to) => {
    socket.to(users[to]).emit("messages", message, from);
  });

  socket.on("joinRoom", (room) => {
    socket.join(room);
    socket.emit("joinedRoom", room);
    console.log(`${room} id'li grubun sohbetine katıldı.`);
  });

  socket.on("groupMessage", (from, room, message) => {
    const messageData = {
      message: message,
      userId: from.id,
      createdAt: new Date(),
      user: { username: from.username, picture: from.picture },
    };
    io.to(room).emit("groupMessage", messageData);
  });

  // Kullanıcı bağlantısı kesildiğinde
  socket.on("disconnect", () => {
    console.log("Bir kullanıcı ayrıldı");
    delete users[socket.username];
  });
});

app.use("/auth", require("./controllers/auth"));
app.use("/group", require("./controllers/group"));
app.use("/friend", require("./controllers/friend"));

// app.use(function (err, req, res) {
//   if (err instanceof ValidationError) {
//     return res.status(err.statusCode).json(err);
//   }
//   return res.status(400).json(err);
// });

const port = 3005;

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
