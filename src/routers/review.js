import { Router } from 'express';
import express from 'express';

import * as controllers from '../controllers/index.js'

const router = Router();

router.use(express.json());

router.post('/', controllers.createNewReview);
router.get('/', controllers.fetchAllReviews);
router.get('/:id', controllers.fetchReviewById);
router.put('/:id', controllers.modifyReview);
router.delete('/:id', controllers.removeReview);


export default router;
