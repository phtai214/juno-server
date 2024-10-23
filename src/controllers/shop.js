import * as services from "../services";

// Create a new shop
export const createNewShop = async (req, res) => {
    try {
        const shopData = req.body;
        const newShop = await services.createShop(shopData);
        return res.status(201).json(newShop);
    } catch (error) {
        console.error('Error in createNewShop controller:', error);
        return res.status(500).json({ error: 'Failed to create shop' });
    }
};

// Get all shops
export const fetchAllShops = async (req, res) => {
    try {
        const shops = await services.getAllShops();
        return res.status(200).json(shops);
    } catch (error) {
        console.error('Error in fetchAllShops controller:', error);
        return res.status(500).json({ error: 'Failed to fetch shops' });
    }
};

// Get shop by ID
export const fetchShopById = async (req, res) => {
    try {
        const shopId = req.params.id;
        const shop = await services.getShopById(shopId);
        return res.status(200).json(shop);
    } catch (error) {
        console.error('Error in fetchShopById controller:', error);
        return res.status(404).json({ error: 'Shop not found' });
    }
};

// Update a shop
export const modifyShop = async (req, res) => {
    try {
        const shopId = req.params.id;
        const updatedData = req.body;
        const updatedShop = await services.updateShop(shopId, updatedData);
        return res.status(200).json(updatedShop);
    } catch (error) {
        console.error('Error in modifyShop controller:', error);
        return res.status(500).json({ error: 'Failed to update shop' });
    }
};

// Delete a shop
export const removeShop = async (req, res) => {
    try {
        const shopId = req.params.id;
        await services.deleteShop(shopId);
        return res.status(200).json({ message: 'Shop deleted successfully' });
    } catch (error) {
        console.error('Error in removeShop controller:', error);
        return res.status(500).json({ error: 'Failed to delete shop' });
    }
};
