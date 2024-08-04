import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import UserModel from './models/User.js';

const saltRounds = 10;

const loginUser = async (req, res) => {
  try {
    const { userName, password } = req.body;
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
    return res.json({
      user: JSON.parse(decodedUser)
    });
  } catch (e) {}
};

export { loginUser, getUserDetails };
