import { Request, Response, NextFunction } from 'express';
import Product from '../models/productModel.js';

const PAGE_SIZE = 10;

export const searchProducts = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { query } = req;

        const page = (query.page as string) || 1;
        const startIndex = (Number(page) - 1) * PAGE_SIZE;

        const searchQuery = query.search || '';
        const tags = (query.tags as string) || '';

        const queryFilter = searchQuery
            ? {
                  name: {
                      $regex: searchQuery,
                      $options: 'i',
                  },
              }
            : {};
        const tagFilter = tags
            ? {
                  tag: { $in: tags.split(',') },
              }
            : {};

        const products = await Product.find({ $and: [queryFilter, tagFilter] })
            .skip(startIndex)
            .limit(PAGE_SIZE);

        const countProducts = await Product.countDocuments({
            $and: [queryFilter, tagFilter],
        });
        res.send({
            products,
            countProducts,
            // numberOfPages: Math.ceil(countProducts / PAGE_SIZE),
        });
    } catch (error) {
        next(error);
    }
};

export const getProductDetail = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { id } = req.params;
    try {
        const product = await Product.findById(id);
        if (product) {
            res.send({ product });
        } else {
            res.status(404);
            throw new Error('查無資料');
        }
    } catch (error) {
        next(error);
    }
};
