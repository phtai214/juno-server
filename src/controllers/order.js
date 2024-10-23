import * as services from "../services"

// Create a new order
export const createNewOrder = async (req, res) => {
    try {
        const orderData = req.body;
        const newOrder = await services.createOrder(orderData);
        return res.status(201).json(newOrder);
    } catch (error) {
        console.error('Error in createNewOrder controller:', error);
        return res.status(500).json({ error: 'Failed to create order' });
    }
};

// Get all orders (with pagination)
export const fetchAllOrders = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const ordersData = await services.getAllOrders(page, limit);
        return res.status(200).json(ordersData);
    } catch (error) {
        console.error('Error in fetchAllOrders controller:', error);
        return res.status(500).json({ error: 'Failed to fetch orders' });
    }
};

// Get order by ID
export const fetchOrderById = async (req, res) => {
    try {
        const orderId = req.params.id;
        const order = await services.getOrderById(orderId);
        return res.status(200).json(order);
    } catch (error) {
        console.error('Error in fetchOrderById controller:', error);
        return res.status(404).json({ error: 'Order not found' });
    }
};

// Update order
export const modifyOrder = async (req, res) => {
    try {
        const orderId = req.params.id;
        const updatedData = req.body;
        const updatedOrder = await services.updateOrder(orderId, updatedData);
        return res.status(200).json(updatedOrder);
    } catch (error) {
        console.error('Error in modifyOrder controller:', error);
        return res.status(500).json({ error: 'Failed to update order' });
    }
};

// Delete order
export const removeOrder = async (req, res) => {
    try {
        const orderId = req.params.id;
        await services.deleteOrder(orderId);
        return res.status(200).json({ message: 'Order deleted successfully' });
    } catch (error) {
        console.error('Error in removeOrder controller:', error);
        return res.status(500).json({ error: 'Failed to delete order' });
    }
};
