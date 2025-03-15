const { Server } = require("socket.io");
let users = [];

function initializeSocketIO(server) {
  const io = new Server(server);

  io.on("connection", (socket) => {
    console.log("Bir kullanıcı bağlandı");

    socket.on("join", (username) => {
      socket.username = username;
      users[username] = socket.id;
      socket.emit("joined", socket.username);
      console.log(`${username} sohbete katıldı.`);
    });

    socket.on("message", (message, from, to) => {
      console.log(message, from, to);
    });

    // Kullanıcı bağlantısı kesildiğinde
    socket.on("disconnect", () => {
      delete users[socket.username];
      console.log("Bir kullanıcı ayrıldı");
    });
  });
}

module.exports = initializeSocketIO;
