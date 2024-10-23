import { Router } from 'express';
import express from 'express';

import * as controllers from '../controllers/index.js'

const router = Router();

router.use(express.json());

router.post('/shops', controllers.createNewShop);
router.get('/shops', controllers.fetchAllShops);
router.get('/shops/:id', controllers.fetchShopById);
router.put('/shops/:id', controllers.modifyShop);
router.delete('/shops/:id', controllers.removeShop);



export default router;
