import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import UserModel from './models/User.js';

const saltRounds = 10;
const onlineUsers = [];

const loginUser = async (req, res) => {
  try {
    const { userName, password, selectedRoom } = req.body;
    let user;
    let isExistingUser = false;

    user = await UserModel.findOne({ username: userName });
    if (user) {
      const isPassComparedRes = await bcrypt.compare(password, user.password);
      if (isPassComparedRes) {
        isExistingUser = true;
      } else {
        return res.json({
          error: true,
          message: 'User not found!'
        });
      }
    } else {
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      user = new UserModel({ username: userName, password: hashedPassword });
      await user.save();
    }

    const accessToken = await jwt.sign(JSON.stringify(userName), process.env.TOKEN_SECRET);

    return res.json({
      user: userName,
      token: accessToken,
      isExistingUser
    });
  } catch (e) {}
};

const getUserDetails = async (req, res) => {
  try {
    const decodedUser = await jwt.verify(req.headers.authorization, process.env.TOKEN_SECRET);
    const userParsed = JSON.parse(decodedUser);
    return res.json({
      user: userParsed
    });
  } catch (e) {}
};

const addOnlineUser = (data) => {
  let userFiltered = onlineUsers.filter(
    (user) => user.name === data.user && user.room === data.room
  );

  if (userFiltered.length <= 0) {
    onlineUsers.push({
      name: data.user,
      room: data.room,
      room_id: data.room_id
    });
  }
  return;
};

const removeOnlineUser = (data) => {
  let userIndex = onlineUsers.findIndex(
    (user) => user.name === data.user && user.room === data.room
  );

  if (userIndex !== -1) {
    onlineUsers.splice(userIndex, 1);
  }
};

const getOnlineUsers = (room) => {
  return onlineUsers.filter((user) => user.room === room);
};

export { loginUser, getUserDetails, addOnlineUser, removeOnlineUser, getOnlineUsers };
