import { Router } from 'express';
import express from 'express';
import uploadCloud from '../middleware/cloudinary.js'

import * as controllers from '../controllers/index.js'

const router = Router();

router.use(express.json());
router.post('/orders', controllers.createNewOrder);
router.get('/orders', controllers.fetchAllOrders);
router.get('/orders/:id', controllers.fetchOrderById);
router.put('/orders/:id', controllers.modifyOrder);
router.delete('/orders/:id', controllers.removeOrder);



export default router;
