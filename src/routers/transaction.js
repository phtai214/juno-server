import { Router } from 'express';
import express from 'express';

import * as controllers from '../controllers/index.js'

const router = Router();

router.use(express.json());

router.post('/transactions', controllers.createNewTransaction);
router.get('/transactions', controllers.fetchAllTransactions);
router.get('/transactions/:id', controllers.fetchTransactionById);
router.put('/transactions/:id', controllers.modifyTransaction);
router.delete('/transactions/:id', controllers.removeTransaction);
router.post('/payment/initiate', controllers.initiatePayment);



export default router;
