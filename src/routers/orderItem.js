import { Router } from 'express';
import express from 'express';
import uploadCloud from '../middleware/cloudinary.js'

import * as controllers from '../controllers/index.js'

const router = Router();

router.use(express.json());

router.post('/order-items', controllers.createNewOrderItem);
router.get('/order-items', controllers.fetchAllOrderItems);
router.get('/order-items/:id', controllers.fetchOrderItemById);
router.put('/order-items/:id', controllers.modifyOrderItem);
router.delete('/order-items/:id', controllers.removeOrderItem);



export default router;
