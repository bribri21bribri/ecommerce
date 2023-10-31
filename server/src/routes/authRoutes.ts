import express from 'express';
import {
    registerUser,
    authUser,
    logoutUser,
} from '../controllers/authController.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', authUser);
router.post('/logout', logoutUser);

export default router;
