import express from 'express';
import {
    getUserOrders,
    getUserProfile,
    updateUserProfile,
} from '../controllers/userController.js';

const router = express.Router();

router.route('/profile').get(getUserProfile).put(updateUserProfile);
router.route('/order').get(getUserOrders);

export default router;
