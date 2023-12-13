class SocketManager {
    constructor() {
      this.connectedUsers = new Map();
    }
  
    addUser(userId, socket) {
      this.connectedUsers.set(userId, socket);
    }
  
    removeUser(userId) {
      this.connectedUsers.delete(userId);
    }
  
    sendNotification(userId, event, data) {
      const socket = this.connectedUsers.get(userId);
      if (socket) {
        socket.emit(event, data);
      }
    }
  }
  
  module.exports = new SocketManager();
  