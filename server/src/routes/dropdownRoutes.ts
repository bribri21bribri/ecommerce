import express from 'express';
import { getCityDropdowns } from '../controllers/dropdownController.js';

const router = express.Router();

router.route('/city').get(getCityDropdowns);

export default router;
