import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import UserModel from './models/User.js';

const saltRounds = 10;

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const user = new UserModel({ username, password: hashedPassword });
    await user.save();

    const accessToken = jwt.sign(JSON.stringify(user), process.env.TOKEN_SECRET);

    res.json({
      user: username,
      token: accessToken
    });
  } catch (e) {}
};

export { loginUser };
