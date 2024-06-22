// socket.js
import { Server } from "socket.io";

export const activeOnlineUser = new Set();
export const notifications = [];

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
      activeOnlineUser.add(userId);
      this.io.emit('online-user', [...activeOnlineUser]);

      // Join the user to their room based on their userId
      socket.join(userId);
      console.log('user joined: ', userId);

      socket.on("disconnect", () => {
        console.log("User disconnected", socket.id);
        activeOnlineUser.delete(userId);
        this.io.emit('online-user', [...activeOnlineUser]);
        console.log('user left: ', userId);
      });

      socket.on("notification", (notification) => {
        console.log('Received notification:', notification);

        // Check if the room exists and the user is part of the room
        const rooms = this.io.sockets.adapter.rooms;
        const roomExists = rooms.has(notification.id);
        console.log('Room exists:', roomExists, 'for userId:', notification.id);

        if (roomExists) {
          notifications.push(notification);
          this.io.to(notification.id).emit("notification", notification);
          console.log('Notification emitted to room:', notification.id);
        } else {
          console.log('Room not found for userId:', notification.id);
        }
      });

      socket.on("broadcast-notification", (notification) => {
        notifications.push(notification);
        this.io.emit("notification", notification);
        console.log('Broadcast notification:', notification);
      });
    });
  }
}
