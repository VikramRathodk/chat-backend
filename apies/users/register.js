import { Router } from 'express';
const router = Router();
import User from '../../models/User.js'

router.post('/', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send({ message: 'Username and password are required' });
  }

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).send({ message: 'Username already exists' });
    }

    const newUser = new User({ username, password });
    await newUser.save();

    res.status(201).send({ message: 'User registered successfully' ,data:newUser});
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Server error' });
  }
});

export default router;
