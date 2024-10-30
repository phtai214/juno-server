import { Router } from 'express';
import express from 'express';

import * as controllers from '../controllers/index.js'

const router = Router();

router.use(express.json());

router.post('/carts', controllers.createNewCart);
router.get('/carts', controllers.fetchAllCarts);
router.get('/carts/:id', controllers.fetchCartById);
router.put('/carts/:id', controllers.modifyCart);
router.delete('/carts/:id', controllers.removeCart);
router.get('/user/:userId', controllers.fetchCartByUserId);



export default router;
