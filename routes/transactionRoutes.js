// routes/transactionRoutes.js
import express from 'express';
import { makeTransaction, getMerchantTransactions } from '../controllers/transactionController.js';
const router = express.Router();

router.post('/buy', makeTransaction);
router.get('/merchant-transactions', getMerchantTransactions);

export default router;

