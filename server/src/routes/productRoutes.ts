import express from 'express';
import {
    searchProducts,
    getProductDetail,
} from '../controllers/productController.js';

const router = express.Router();

router.route('/').get(searchProducts);
router.route('/:id').get(getProductDetail);

export default router;
