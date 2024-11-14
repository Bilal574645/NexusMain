import { Server } from 'socket.io';

let io;
export default function handler(req, res) {
  if (!io) {
    const socketServer = new Server(res.socket.server, {
      path: '/api/socket',
    });

    io = socketServer;

    socketServer.on('connection', (socket) => {
      console.log('A user connected');
      
      // Join a specific room
      socket.on('joinRoom', (room) => {
        socket.join(room);
        console.log(`User joined room: ${room}`);
      });

      // Send message to room
      socket.on('sendMessage', (message) => {
        socket.to(message.room).emit('receiveMessage', message);
      });

      // Disconnect from room
      socket.on('disconnect', () => {
        console.log('A user disconnected');
      });
    });
  }

  res.end();
}
