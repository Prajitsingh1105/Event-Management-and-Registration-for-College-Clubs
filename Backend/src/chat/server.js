import { Server } from "socket.io";

export function initChat(httpServer) {
  const io = new Server(httpServer, {
    cors: {
      origin: [/^http:\/\/localhost:\d+$/],
      methods: ["GET", "POST"],
    },
  });

  const users = new Map();
  const messages = [];
  const reports = [];

  function broadcastActiveUsers() {
    io.emit("activeUsers", Array.from(users.values()));
  }

  io.on("connection", (socket) => {
    console.log("Socket connected:", socket.id);

    socket.on("join", (username) => {
      username = (username || "Anonymous").trim().slice(0, 32);
      users.set(socket.id, username);
      socket.username = username;

      socket.emit("init", { messages, users: Array.from(users.values()) });

      const systemMsg = {
        id: `sys-${Date.now()}-${Math.random().toString(36).slice(2,8)}`,
        user: "System",
        text: `${username} joined the chat`,
        time: new Date().toISOString(),
        type: "system"
      };
      messages.push(systemMsg);
      io.emit("message", systemMsg);

      broadcastActiveUsers();
    });

    socket.on("sendMessage", ({ text }) => {
      if (!socket.username || !text?.trim()) return;
      const msg = {
        id: `m-${Date.now()}-${Math.random().toString(36).slice(2,8)}`,
        user: socket.username,
        text: text.slice(0, 1000),
        time: new Date().toISOString(),
        type: "text"
      };
      messages.push(msg);
      io.emit("message", msg);
    });

    socket.on("sendEmoji", ({ emoji }) => {
      if (!socket.username || !emoji) return;
      const msg = {
        id: `e-${Date.now()}-${Math.random().toString(36).slice(2,8)}`,
        user: socket.username,
        text: emoji.slice(0, 10),
        time: new Date().toISOString(),
        type: "emoji"
      };
      messages.push(msg);
      io.emit("message", msg);
    });

    socket.on("reportUser", ({ reportedUser, reason }) => {
      if (!reportedUser) {
        socket.emit("reportResult", { success: false, message: "No username supplied." });
        return;
      }
      const rpt = {
        id: `r-${Date.now()}-${Math.random().toString(36).slice(2,8)}`,
        reporter: socket.username || "Anonymous",
        reportedUser,
        reason: reason?.slice(0,500) || "",
        time: new Date().toISOString()
      };
      reports.push(rpt);
      socket.emit("reportResult", { success: true, message: `Reported ${reportedUser}` });
      console.log("New report:", rpt);
    });

    socket.on("disconnect", () => {
      const username = users.get(socket.id);
      users.delete(socket.id);
      if (username) {
        const systemMsg = {
          id: `sys-${Date.now()}-${Math.random().toString(36).slice(2,8)}`,
          user: "System",
          text: `${username} left the chat`,
          time: new Date().toISOString(),
          type: "system"
        };
        messages.push(systemMsg);
        io.emit("message", systemMsg);
      }
      broadcastActiveUsers();
      console.log("Socket disconnected:", socket.id);
    });
  });
}
