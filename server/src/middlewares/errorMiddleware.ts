import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';

export const notFound = (req: Request, res: Response, next: NextFunction) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
};

export const errorHandler = (
    err: Error | mongoose.MongooseError,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    let message = err.message;

    if (
        err.name === 'CastError' &&
        (err as mongoose.CastError).kind! === 'ObjectId'
    ) {
        statusCode = 404;
        message = 'Resource not found';
    }
    res.status(statusCode).json({
        message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
};
