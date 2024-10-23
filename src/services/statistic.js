import db from "../models/index";

// Create a new statistic
export const createStatistic = async (statisticData) => {
    try {
        const newStatistic = await db.Statistic.create(statisticData);
        return newStatistic;
    } catch (error) {
        console.error('Error creating statistic:', error);
        throw error;
    }
};

// Get all statistics
export const getAllStatistics = async () => {
    try {
        const statistics = await db.Statistic.findAll();
        return statistics;
    } catch (error) {
        console.error('Error fetching statistics:', error);
        throw error;
    }
};

// Get statistic by ID
export const getStatisticById = async (statisticId) => {
    try {
        const statistic = await db.Statistic.findByPk(statisticId);
        if (!statistic) {
            throw new Error('Statistic not found');
        }
        return statistic;
    } catch (error) {
        console.error('Error fetching statistic by ID:', error);
        throw error;
    }
};

// Update a statistic
export const updateStatistic = async (statisticId, updatedData) => {
    try {
        const statistic = await db.Statistic.findByPk(statisticId);
        if (!statistic) {
            throw new Error('Statistic not found');
        }
        const updatedStatistic = await statistic.update(updatedData);
        return updatedStatistic;
    } catch (error) {
        console.error('Error updating statistic:', error);
        throw error;
    }
};

// Delete a statistic
export const deleteStatistic = async (statisticId) => {
    try {
        const statistic = await db.Statistic.findByPk(statisticId);
        if (!statistic) {
            throw new Error('Statistic not found');
        }
        await statistic.destroy();
        return { message: 'Statistic deleted successfully' };
    } catch (error) {
        console.error('Error deleting statistic:', error);
        throw error;
    }
};
