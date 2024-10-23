import db from "../models/index"

// Create new Review
export const createReview = async (reviewData) => {
    try {
        const newReview = await db.Review.create(reviewData);
        return newReview;
    } catch (error) {
        console.error('Error creating review:', error);
        throw error;
    }
};

// Get all Reviews
export const getAllReviews = async () => {
    try {
        const reviews = await db.Review.findAll({
            include: ['user', 'product'] // Include liên kết User và Product
        });
        return reviews;
    } catch (error) {
        console.error('Error fetching reviews:', error);
        throw error;
    }
};

// Get Review by ID
export const getReviewById = async (reviewId) => {
    try {
        const review = await db.Review.findByPk(reviewId, {
            include: ['user', 'product'] // Include liên kết User và Product
        });
        if (!review) {
            throw new Error('Review not found');
        }
        return review;
    } catch (error) {
        console.error('Error fetching review by ID:', error);
        throw error;
    }
};

// Update a Review
export const updateReview = async (reviewId, updatedData) => {
    try {
        const review = await db.Review.findByPk(reviewId);
        if (!review) {
            throw new Error('Review not found');
        }
        const updatedReview = await review.update(updatedData);
        return updatedReview;
    } catch (error) {
        console.error('Error updating review:', error);
        throw error;
    }
};

// Delete a Review
export const deleteReview = async (reviewId) => {
    try {
        const review = await db.Review.findByPk(reviewId);
        if (!review) {
            throw new Error('Review not found');
        }
        await review.destroy();
        return { message: 'Review deleted successfully' };
    } catch (error) {
        console.error('Error deleting review:', error);
        throw error;
    }
};
