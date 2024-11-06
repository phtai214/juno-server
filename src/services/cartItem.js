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
            include: [
                { model: db.Cart, as: 'cart' }, // Kết nối tới Cart
                {
                    model: db.Variation,
                    as: 'variation',
                    include: [
                        { model: db.Product, as: 'product' }, // Kết nối tới Product
                        { model: db.ProductDetail, as: 'productDetail' } // Kết nối tới ProductDetail
                    ]
                }
            ]
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
            include: [
                { model: db.Cart, as: 'cart' }, // Kết nối tới Cart
                {
                    model: db.Variation,
                    as: 'variation',
                    include: [
                        { model: db.Product, as: 'product' }, // Kết nối tới Product
                        { model: db.ProductDetail, as: 'productDetail' } // Kết nối tới ProductDetail
                    ]
                }
            ]
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
            include: [
                { model: db.Cart, as: 'cart' }, // Kết nối tới Cart
                {
                    model: db.Variation,
                    as: 'variation',
                    include: [
                        { model: db.Product, as: 'product' }, // Kết nối tới Product
                        { model: db.ProductDetail, as: 'productDetail' } // Kết nối tới ProductDetail
                    ]
                }
            ]
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
