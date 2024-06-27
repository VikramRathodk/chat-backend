import express from 'express';
import registerRouter from './auth/register.js';
import getUserRouter from './auth/get_user.js'

const router = express.Router();

router.use('/register', registerRouter);
router.use('/get_users', getUserRouter);

export default router;
