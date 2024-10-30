import { Router } from 'express';
import express from 'express';


import * as controllers from '../controllers/index.js'

const router = Router();

router.use(express.json());
router.post('/', controllers.createNewOrder);
router.get('/', controllers.fetchAllOrders);
router.get('/:id', controllers.fetchOrderById);
router.put('/:id', controllers.modifyOrder);
router.delete('/:id', controllers.removeOrder);



export default router;
