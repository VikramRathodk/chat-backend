import express, { json } from 'express';
import { config } from 'dotenv';
import registerRoute from './apies/users/register.js';
import getUsers from './apies/users/get_user.js';
import connectToDatabase from './db.js'; 

config();

const PORT = process.env.PORT || 3000;

const app = express();
app.use(json());

const startServer = async () => {
  try {
    await connectToDatabase();
    console.log('Connected to MongoDB');

    // Register routes
    app.use('/register', registerRoute);
    app.use('/users', getUsers);

    app.get('/', (req, res) => {
      res.send('Hello world');
    });

    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to connect to the database', error);
  }
};

startServer();
