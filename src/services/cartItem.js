import db from "../models/index"

// Create new CartItem
export const createCartItem = async (cartItemData) => {
    try {
        const newCartItem = await db.CartItem.create(cartItemData);
        return newCartItem;
    } catch (error) {
        console.error('Error creating cart item:', error);
        throw error;
    }
};

// Get all CartItems
export const getAllCartItems = async () => {
    try {
        const cartItems = await db.CartItem.findAll({
            include: ['cart', 'product'] // Include related models Cart and Product
        });
        return cartItems;
    } catch (error) {
        console.error('Error fetching cart items:', error);
        throw error;
    }
};

// Get CartItem by ID
export const getCartItemById = async (cartItemId) => {
    try {
        const cartItem = await db.CartItem.findByPk(cartItemId, {
            include: ['cart', 'product'] // Include related models Cart and Product
        });
        if (!cartItem) {
            throw new Error('CartItem not found');
        }
        return cartItem;
    } catch (error) {
        console.error('Error fetching cart item by ID:', error);
        throw error;
    }
};

// Get CartItems by Cart ID
export const getCartItemsByCartId = async (cartId) => {
    try {
        const cartItems = await db.CartItem.findAll({
            where: { cart_id: cartId }, // Lọc theo cart_id
            include: ['cart', 'product'] // Bao gồm các mô hình liên quan
        });
        return cartItems;
    } catch (error) {
        console.error('Error fetching cart items by cart ID:', error);
        throw error;
    }
};

// Update a CartItem
export const updateCartItem = async (cartItemId, updatedData) => {
    try {
        const cartItem = await db.CartItem.findByPk(cartItemId);
        if (!cartItem) {
            throw new Error('CartItem not found');
        }
        const updatedCartItem = await cartItem.update(updatedData);
        return updatedCartItem;
    } catch (error) {
        console.error('Error updating cart item:', error);
        throw error;
    }
};

// Delete a CartItem
export const deleteCartItem = async (cartItemId) => {
    try {
        const cartItem = await db.CartItem.findByPk(cartItemId);
        if (!cartItem) {
            throw new Error('CartItem not found');
        }
        await cartItem.destroy();
        return { message: 'CartItem deleted successfully' };
    } catch (error) {
        console.error('Error deleting cart item:', error);
        throw error;
    }
};
