import mongoose from 'mongoose';

const connectDB = () => {
  const url =
    'mongodb+srv://faizanb:faiza%40mongo123%23@cluster0.eiooso1.mongodb.net/chat_app_users';

  try {
    mongoose.connect(url);
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
  const dbConnection = mongoose.connection;
  dbConnection.once('open', (_) => {
    console.log(`Database connected: ${url}`);
  });

  dbConnection.on('error', (err) => {
    console.error(`connection error: ${err}`);
  });
  return;
};

export default connectDB;
