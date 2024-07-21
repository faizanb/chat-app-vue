import express from 'express';
import 'dotenv/config';
import http from 'http';
import cors from 'cors';
import { Server } from 'socket.io';

const PORT = process.env.PORT || 4000;
const app = express();
const server = http.createServer(app);

app.use(cors());

const io = new Server(server, {
  cors: {
    origin: '*'
  }
});

io.on('connection', (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
  socket.on('message', (data) => {
    console.log(data);
  });
  socket.on('join_room', (data) => {
    console.log('room data..', data);
  });
});

server.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
