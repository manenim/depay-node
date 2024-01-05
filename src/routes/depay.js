import express from 'express';
import { pay } from '../controllers/depay.js';

const router = express.Router();

router.get('/depay', pay)

export default router