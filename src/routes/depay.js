import express from 'express';
import { callback, configuration, } from '../controllers/depay.js';

const router = express.Router();

router.post('/config', configuration)
router.post('/callback', callback)

export default router