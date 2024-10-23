import { Router } from 'express';
import express from 'express';

import * as controllers from '../controllers/index.js'

const router = Router();

router.use(express.json());

router.post('/statistics', controllers.createNewStatistic);
router.get('/statistics', controllers.fetchAllStatistics);
router.get('/statistics/:id', controllers.fetchStatisticById);
router.put('/statistics/:id', controllers.modifyStatistic);
router.delete('/statistics/:id', controllers.removeStatistic);



export default router;
