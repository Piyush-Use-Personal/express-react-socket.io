// socket.js
import { Server } from "socket.io";

export const activeOnlineUser = new Set()

export class SocketServer {
  constructor(expressServer) {
    this.server = expressServer;
    this.io = new Server(this.server, {
      cors: {
        origin: '*', // Adjust this to allow requests from specific origins
        methods: ['GET', 'POST'], // Adjust this to allow specific HTTP methods
      },
    });
    this.io.on("connection", (socket) => {
      const userId = socket.handshake.query.userId;
      activeOnlineUser.add(userId)
      this.io.emit('online-user', [...activeOnlineUser]);
      // Join the user to their room based on their userId
      socket.join(userId);

      socket.on("disconnect", () => {
        console.log("User disconnected", socket.id);
        activeOnlineUser.delete(userId)
        this.io.emit('online-user', [...activeOnlineUser]);
      });

      // Handle chat messages
      socket.on("chat-message", (msg) => {
        console.log("message: " + msg);
      });
    });
  }

  sendNotification(notification) {
    const json = notification.toJSON()
    const value = this.io.to(json.user.toString()).emit("notification", notification);
    return value
  }
}

