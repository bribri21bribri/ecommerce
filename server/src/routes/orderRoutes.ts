import express from 'express';
import {
    createUserOrders,
    getUserOrderDetail,
    getUserOrderHistory,
    updateUserOrderPayStatus,
} from '../controllers/orderController.js';

const router = express.Router();

router.route('/').post(createUserOrders);
router.route('/history').get(getUserOrderHistory);
router.route('/:id').get(getUserOrderDetail);
router.route(':/id/pay').put(updateUserOrderPayStatus);

export default router;
