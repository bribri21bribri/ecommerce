import { NextFunction, Request, Response } from 'express';
import CityDropdown from '../models/cityDropdownModel.js';

export const getCityDropdowns = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const cityDropdowns = await CityDropdown.find({});
        if (cityDropdowns) {
            res.send({ cityDropdowns });
        } else {
            res.status(404);
            throw new Error('查無資料');
        }
    } catch (error) {
        next(error);
    }
};
