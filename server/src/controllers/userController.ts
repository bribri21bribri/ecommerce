import { NextFunction, Request, Response } from 'express';
import User from '../models/userModel.js';
import Order from '../models/orderModel.js';

// route GET /api/user/profile
export const getUserProfile = async (req: Request, res: Response) => {
    const user = {
        _id: req.user?._id,
        name: req.user?.name,
        email: req.user?.email,
    };

    res.status(200).json(user);
};
// route PUT /api/user/profile
export const updateUserProfile = async (req: Request, res: Response) => {
    const user = await User.findById(req.user!._id);

    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        if (req.body.password) {
            user.password = req.body.password;
        }
        const updatedUser = await user.save();
        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
        });
    } else {
        res.status(404);
        throw new Error('無此使用者');
    }
};

// route GET /api/user/order
export const getUserOrders = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const orders = await Order.find({ user: req.user!._id });
        res.send(orders);
    } catch (error) {
        next(error);
    }
};
