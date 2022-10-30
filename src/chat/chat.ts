import { io } from "../server";

import { addUser, removeUserRoom, getUsersInRoom } from "./helpers/users";

io.on("connection", (socket) => {
  socket.on("join", ({ userName, room }, callback) => {
    const userRemoved = removeUserRoom(socket.id);

    if (userRemoved) {
      if (!userRemoved.room) return;

      io.to(userRemoved.room).emit("roomData", {
        room: userRemoved.room,
        users: getUsersInRoom(userRemoved.room),
      });
    }

    const usersInRoom = getUsersInRoom(room);

    if (usersInRoom[0] === undefined) {
      const { error, user } = addUser({
        id: socket.id,
        userName: userName,
        room: room,
      });

      if (error) {
        return callback(error);
      }

      if (!user) {
        return callback({ error: "User not found" });
      }

      socket.join(user.room);

      io.to(user.room).emit("roomData", {
        room: user.room,
        users: getUsersInRoom(room),
      });

      io.to(user.room).emit("message", {
        name: "Bot",
        message: `${userName} just joined!`,
      });
    } else {
      const { error, user } = addUser({
        id: socket.id,
        userName: userName,
        room: room,
      });

      if (error) {
        return callback(error);
      }

      if (!user) {
        return callback({ error: "User not found" });
      }

      socket.join(user.room);

      io.to(user.room).emit("message", {
        name: "Bot",
        message: `${userName} just joined!`,
      });

      io.to(user.room).emit("roomData", {
        room: user.room,
        users: getUsersInRoom(room),
      });
    }
  });

  socket.on("sendMessage", (data) => {
    const room = data.room;

    const message = {
      name: data.name,
      id: data.id,
      message: data.message,
      room: room,
      time: data.time,
      quotedMessage: data.quotedMessage,
    };

    io.to(room).emit("message", message);
  });

  socket.on("typing", (data) => {
    const room = data.room;

    socket.broadcast
      .to(room)
      .emit("typing", { isTyping: data.isTyping, name: data.name });
  });

  socket.on("disconnect", (data) => {
    const user = removeUserRoom(socket.id);

    if (user?.room) {
      io.to(user.room).emit("roomData", {
        room: user.room,
        users: getUsersInRoom(user.room),
      });
      io.to(user.room).emit("message", {
        name: "Bot",
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        message: `${data.userName || "A person"} just disconnected`,
      });

      socket.leave(user.room);
    }
  });

  socket.on("leaveRoom", (data) => {
    const user = removeUserRoom(socket.id);

    if (user?.room) {
      io.to(user.room).emit("roomData", {
        room: user.room,
        users: getUsersInRoom(user.room),
      });
      io.to(user.room).emit("message", {
        name: "Bot",
        message: `${data.userName} just disconnected`,
      });

      socket.leave(user.room);
    }
  });
});
