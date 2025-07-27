import express from 'express';
import 'dotenv/config';
import bodyParser from 'body-parser';
import http from 'http';
import cors from 'cors';
import { Server } from 'socket.io';

import connectDB from './db.js';
import {
  loginUser,
  getUserDetails,
  addOnlineUser,
  removeOnlineUser,
  getOnlineUsers
} from './user.js';

const PORT = process.env.PORT || 4010;
const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, parameterLimit: 800000, limit: '50mb' }));

connectDB();

app.post('/api/loginUser', loginUser);
app.get('/api/getUserDetails', getUserDetails);

const io = new Server(server, {
  cors: {
    origin: '*'
  }
});

io.on('connection', (socket) => {
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });

  socket.on('join_room', (data, callback) => {
    console.log(`User ${data.user} joined room: ${data.room.name}`);
    const room = data.room.name;

    socket.join(room);

    addOnlineUser({
      user: data.user,
      room: data.room.name,
      room_id: data.room.id
    });

    let __createdtime__ = Date.now();

    socket.to(room).emit('notification', {
      message: `${data.user} has joined the chat room`,
      __createdtime__
    });

    io.to(room).emit('users', { users: getOnlineUsers(room), isExiting: false });

    callback();
  });

  socket.on('send_message', (data) => {
    const { message, user, room, __createdtime__ } = data;
    io.to(room.name).emit('receive_message', data);
    //Persist messages in DB for each room - Add code here
  });

  socket.on('leave_room', (data, callback) => {
    const room = data.room.name;

    removeOnlineUser({
      user: data.user,
      room: data.room.name,
      room_id: data.room.id
    });

    let __createdtime__ = Date.now();

    socket.to(room).emit('notification', {
      message: `${data.user} has left the chat room`,
      __createdtime__
    });

    io.to(room).emit('users', {
      users: getOnlineUsers(room),
      isExiting: true,
      exitingUser: data.user
    });

    callback();
  });
});

server.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
