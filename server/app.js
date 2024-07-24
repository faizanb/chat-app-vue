import express from 'express';
import 'dotenv/config';
import bodyParser from 'body-parser';
import http from 'http';
import cors from 'cors';
import { Server } from 'socket.io';

import connectDB from './db.js';
import { loginUser } from './user.js';

const PORT = process.env.PORT || 4000;
const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, parameterLimit: 800000, limit: '50mb' }));

connectDB();

app.post('/api/loginUser', loginUser);

const io = new Server(server, {
  cors: {
    origin: '*'
  }
});

io.on('connection', (socket) => {
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
  socket.on('message', (data) => {
    console.log(data);
  });
  socket.on('join_room', (data, callback) => {
    console.log('room data..', data);
    callback();
  });
});

server.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
