import mongoose from 'mongoose';

const UsersSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

const UsersModel = mongoose.model('users', UsersSchema);
export default UsersModel;
