import db from "../models/index"

// Create a new shop
export const createShop = async (shopData) => {
    try {
        const newShop = await db.Shop.create(shopData);
        return newShop;
    } catch (error) {
        console.error('Error creating shop:', error);
        throw error;
    }
};

// Get all shops
export const getAllShops = async () => {
    try {
        const shops = await db.Shop.findAll();
        return shops;
    } catch (error) {
        console.error('Error fetching shops:', error);
        throw error;
    }
};

// Get shop by ID
export const getShopById = async (shopId) => {
    try {
        const shop = await db.Shop.findByPk(shopId);
        if (!shop) {
            throw new Error('Shop not found');
        }
        return shop;
    } catch (error) {
        console.error('Error fetching shop by ID:', error);
        throw error;
    }
};

// Update a shop
export const updateShop = async (shopId, updatedData) => {
    try {
        const shop = await db.Shop.findByPk(shopId);
        if (!shop) {
            throw new Error('Shop not found');
        }
        const updatedShop = await shop.update(updatedData);
        return updatedShop;
    } catch (error) {
        console.error('Error updating shop:', error);
        throw error;
    }
};

// Delete a shop
export const deleteShop = async (shopId) => {
    try {
        const shop = await db.Shop.findByPk(shopId);
        if (!shop) {
            throw new Error('Shop not found');
        }
        await shop.destroy();
        return { message: 'Shop deleted successfully' };
    } catch (error) {
        console.error('Error deleting shop:', error);
        throw error;
    }
};
