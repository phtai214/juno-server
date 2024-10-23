import { Router } from 'express';
import express from 'express';

import * as controllers from '../controllers/index.js'

const router = Router();

router.use(express.json());

router.post('/reviews', controllers.createNewReview);
router.get('/reviews', controllers.fetchAllReviews);
router.get('/reviews/:id', controllers.fetchReviewById);
router.put('/reviews/:id', controllers.modifyReview);
router.delete('/reviews/:id', controllers.removeReview);


export default router;
