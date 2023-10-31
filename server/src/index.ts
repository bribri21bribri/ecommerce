import express, { Express } from 'express';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import userRoutes from './routes/userRoutes.js';
import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import dropdownRoutes from './routes/dropdownRoutes.js';
import { notFound, errorHandler } from './middlewares/errorMiddleware.js';
import connectDB from './config/db.js';
import passportSetup from './config/passport.js';
import passport from 'passport';
import helmet from 'helmet';
import morgan from 'morgan';

dotenv.config();
connectDB();
passportSetup(passport);

const app: Express = express();
const port = process.env.PORT || 8080;
const __dirname = path.resolve();

const accessLogStream = fs.createWriteStream(
    path.join(__dirname, 'access.log')
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(helmet());
app.use(
    helmet.contentSecurityPolicy({
        useDefaults: true,
        directives: {
            'img-src': ["'self'", 'https: data:'],
        },
    })
);
app.use(morgan('combined', { stream: accessLogStream }));

app.get('/api/keys/paypal', (req, res) => {
    res.send(process.env.PAYPAL_CLIENT_ID || 'sb');
});

app.use(
    '/api/user',
    passport.authenticate('jwt', { session: false, failWithError: true }),
    userRoutes
);
app.use('/api/products', productRoutes);
app.use('/api/dropdown', dropdownRoutes);
app.use(
    '/api/order',
    passport.authenticate('jwt', { session: false, failWithError: true }),
    orderRoutes
);
app.use('/api/auth', authRoutes);

app.use(express.static(path.join(__dirname, '/client/dist')));
// app.get('*', (req, res) =>
//     res.sendFile(path.join(__dirname, '../client/dist/index.html'))
// );

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
