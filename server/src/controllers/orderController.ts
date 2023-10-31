import { NextFunction, Request, RequestHandler, Response } from 'express';
import Order from '../models/orderModel.js';

const PAGE_SIZE = 10;

interface CartItem {
    _id: string;
    name: string;
    price: number;
    desc: string;
    imageURL: string;
    cartQuantity: number;
}

// route POST /api/order
export const createUserOrders = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const orderItems = req.body.cartItems.map((item: CartItem) => ({
            product: item._id,
            quantity: item.cartQuantity,
            price: item.price,
        }));
        const newOrder = new Order({
            orderItems: orderItems,
            shippingAddress: req.body.shippingAddress,
            totalPrice: req.body.totalPrice,
            totalQuantity: req.body.totalQuantity,
            user: req.user!._id,
        });

        const order = await newOrder.save();
        // await order.populate('orderItems.product');
        res.status(201).send({
            message: 'New Order Created',
            orderId: order._id,
        });
    } catch (error) {
        next(error);
    }
};
// route GET /api/order/history
export const getUserOrderHistory: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { query } = req;

        const page = (query.page as string) || 1;
        const startIndex = (Number(page) - 1) * PAGE_SIZE;

        const searchQuery = query.search || '';
        // const startDate = (query.startDate as string) || '';
        // const endDate = (query.endDate as string) || '';
        const startDate = query.startDate
            ? new Date(query.startDate as string)
            : null;
        const endDate = query.endDate
            ? new Date(query.endDate as string)
            : null;

        const queryFilter = searchQuery
            ? {
                  _id: {
                      $regex: searchQuery,
                      $options: 'i',
                  },
              }
            : {};

        const dateFilterArr = [];
        if (!!startDate || !!endDate) {
            dateFilterArr.push({
                $and: [
                    startDate ? { createdAt: { $gte: startDate } } : {},
                    endDate ? { createdAt: { $lte: endDate } } : {},
                ],
            });
        }
        // if (!!startDate) {
        //     dateFilterArr.push({ createdAt: { $gte: startDate } });
        // }
        // if (!!endDate) {
        //     dateFilterArr.push({ createdAt: { $lte: endDate } });
        // }

        const userFilter = { user: req.user!._id };
        // const ordersHistory = await Order.find({
        //     $and: [userFilter, queryFilter, ...dateFilterArr],
        // })
        //     .skip(startIndex)
        //     .limit(PAGE_SIZE);
        const ordersHistory = await Order.aggregate([
            {
                $match: { $and: [userFilter, queryFilter, ...dateFilterArr] },
            },
            {
                $project: {
                    _id: 1, // Include the existing fields you want to keep
                    orderItems: 1,
                    shippingAddress: 1,
                    totalPrice: 1,
                    totalQuantity: 1,
                    user: 1,
                    isPaid: 1,
                    paidAt: 1,
                    paymentResult: 1,
                    createdAt: {
                        $dateToString: {
                            format: '%Y/%m/%d', // date format
                            date: '$createdAt',
                            timezone: 'Asia/Taipei', // timezone
                        },
                    },
                },
            },
            { $skip: startIndex },
            { $limit: PAGE_SIZE },
        ]);
        const countHistory = await Order.countDocuments({
            $and: [userFilter, queryFilter, ...dateFilterArr],
        });
        res.send({ ordersHistory, countHistory });
    } catch (error) {
        next(error);
    }
};
// route GET /api/order/:id
export const getUserOrderDetail: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const order = await Order.findById(req.params.id).populate(
            'orderItems.product'
        );
        if (order) {
            res.send(order);
        } else {
            res.status(404);
            throw new Error('查無訂單');
        }
    } catch (error) {
        next(error);
    }
};
// route PUT /api/order/:id/pay
export const updateUserOrderPayStatus = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const order = await Order.findById(req.params.id).populate(
        'user',
        'email name'
    );
    if (order) {
        order.isPaid = true;
        order.paidAt = new Date();
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.email_address,
        };

        const updatedOrder = await order.save();

        res.send({ message: 'Order Paid', order: updatedOrder });
    } else {
        res.status(404).send({ message: 'Order Not Found' });
    }
};
