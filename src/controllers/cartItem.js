import * as services from "../services";

// Create a new CartItem
export const createNewCartItem = async (req, res) => {
    try {
        const cartItemData = req.body;
        const newCartItem = await services.createCartItem(cartItemData);
        return res.status(201).json(newCartItem);
    } catch (error) {
        console.error('Error in createNewCartItem controller:', error);
        return res.status(500).json({ error: 'Failed to create cart item' });
    }
};

// Get all CartItems
export const fetchAllCartItems = async (req, res) => {
    try {
        const cartItems = await services.getAllCartItems();
        return res.status(200).json(cartItems);
    } catch (error) {
        console.error('Error in fetchAllCartItems controller:', error);
        return res.status(500).json({ error: 'Failed to fetch cart items' });
    }
};

// Get CartItem by ID
export const fetchCartItemById = async (req, res) => {
    try {
        const cartItemId = req.params.id;
        const cartItem = await services.getCartItemById(cartItemId);
        return res.status(200).json(cartItem);
    } catch (error) {
        console.error('Error in fetchCartItemById controller:', error);
        return res.status(404).json({ error: 'CartItem not found' });
    }
};

// Get CartItems by Cart ID
export const fetchCartItemsByCartId = async (req, res) => {
    try {
        const cartId = req.params.cartId;
        const cartItems = await services.getCartItemsByCartId(cartId);
        return res.status(200).json(cartItems);
    } catch (error) {
        console.error('Error in fetchCartItemsByCartId controller:', error);
        return res.status(500).json({ error: 'Failed to fetch cart items' });
    }
};


// Update a CartItem
export const modifyCartItem = async (req, res) => {
    try {
        const cartItemId = req.params.id;
        const updatedData = req.body;
        const updatedCartItem = await services.updateCartItem(cartItemId, updatedData);
        return res.status(200).json(updatedCartItem);
    } catch (error) {
        console.error('Error in modifyCartItem controller:', error);
        return res.status(500).json({ error: 'Failed to update cart item' });
    }
};

// Delete a CartItem
export const removeCartItem = async (req, res) => {
    try {
        const cartItemId = req.params.id;
        await services.deleteCartItem(cartItemId);
        return res.status(200).json({ message: 'CartItem deleted successfully' });
    } catch (error) {
        console.error('Error in removeCartItem controller:', error);
        return res.status(500).json({ error: 'Failed to delete cart item' });
    }
};
