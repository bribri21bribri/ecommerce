import express from 'express';
import { HydratedDocument, Document } from 'mongoose';

declare global {
    namespace Express {
        export interface Request {
            user?: {
                _id: string;
                name: string;
                email: string;
                password?: string;
            };
        }

        export interface User
            extends HydratedDocument<{
                _id: string;
                name: string;
                email: string;
                password?: string;
            }> {}

        // export interface User extends Document {
        //     _id: string;
        //     name: string;
        //     email: string;
        //     password?: string;
        // }
    }
}
