import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';

// route POST /api/auth/login
export const authUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { email, password } = req.body;
    try {
        const foundUser = await User.findOne({ email });
        if (!foundUser) {
            res.status(401);
            throw new Error('帳號或密碼錯誤');
        }
        const isMatch = await bcrypt.compare(password, foundUser.password);
        if (isMatch) {
            generateToken(res, foundUser._id.toString());
            res.status(201).json({
                message: '成功登入',
            });
        } else {
            res.status(401);
            throw new Error('帳號或密碼錯誤');
        }
    } catch (error) {
        next(error);
    }
};

// route POST /api/auth/register
export const registerUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { name, email, password } = req.body;
    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            res.status(400);
            throw new Error('此信箱已經被註冊過');
        }

        const user = await User.create({
            name,
            email,
            password,
        });

        if (user) {
            generateToken(res, user._id.toString());
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
            });
        } else {
            res.status(500);
            throw new Error('無法儲存使用者');
        }
    } catch (error) {
        next(error);
    }
};

// route POST /api/user/logout
export const logoutUser = (req: Request, res: Response) => {
    res.cookie('jwt', '', { httpOnly: true, expires: new Date(0) });
    res.status(200).json({ message: '登出' });
};
