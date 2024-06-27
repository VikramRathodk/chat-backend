import { connect } from 'mongoose';
import { config } from 'dotenv';

config();

const uri = process.env.MONGODB_URI;

const connectToDatabase = async () => {
  try {
    await connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Successfully connected to MongoDB using Mongoose!');
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    throw error;
  }
};

export default connectToDatabase;
