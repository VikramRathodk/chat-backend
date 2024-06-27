import { Router } from 'express';
import User from '../../../models/User.js'
const router = Router();


router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Server error' });
  }
});

export default router;
