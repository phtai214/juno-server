import { Router } from 'express';
import express from 'express';

import * as controllers from '../controllers/index.js'

const router = Router();

router.use(express.json());

router.post('/cartItems', controllers.createNewCartItem);
router.get('/cartItems', controllers.fetchAllCartItems);
router.get('/cartItems/:id', controllers.fetchCartItemById);
router.put('/cartItems/:id', controllers.modifyCartItem);
router.delete('/cartItems/:id', controllers.removeCartItem);




export default router;
