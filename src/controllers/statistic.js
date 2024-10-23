import * as services from "../services";

// Create a new statistic
export const createNewStatistic = async (req, res) => {
    try {
        const statisticData = req.body;
        const newStatistic = await services.createStatistic(statisticData);
        return res.status(201).json(newStatistic);
    } catch (error) {
        console.error('Error in createNewStatistic controller:', error);
        return res.status(500).json({ error: 'Failed to create statistic' });
    }
};

// Get all statistics
export const fetchAllStatistics = async (req, res) => {
    try {
        const statistics = await services.getAllStatistics();
        return res.status(200).json(statistics);
    } catch (error) {
        console.error('Error in fetchAllStatistics controller:', error);
        return res.status(500).json({ error: 'Failed to fetch statistics' });
    }
};

// Get statistic by ID
export const fetchStatisticById = async (req, res) => {
    try {
        const statisticId = req.params.id;
        const statistic = await services.getStatisticById(statisticId);
        return res.status(200).json(statistic);
    } catch (error) {
        console.error('Error in fetchStatisticById controller:', error);
        return res.status(404).json({ error: 'Statistic not found' });
    }
};

// Update a statistic
export const modifyStatistic = async (req, res) => {
    try {
        const statisticId = req.params.id;
        const updatedData = req.body;
        const updatedStatistic = await services.updateStatistic(statisticId, updatedData);
        return res.status(200).json(updatedStatistic);
    } catch (error) {
        console.error('Error in modifyStatistic controller:', error);
        return res.status(500).json({ error: 'Failed to update statistic' });
    }
};

// Delete a statistic
export const removeStatistic = async (req, res) => {
    try {
        const statisticId = req.params.id;
        await services.deleteStatistic(statisticId);
        return res.status(200).json({ message: 'Statistic deleted successfully' });
    } catch (error) {
        console.error('Error in removeStatistic controller:', error);
        return res.status(500).json({ error: 'Failed to delete statistic' });
    }
};
