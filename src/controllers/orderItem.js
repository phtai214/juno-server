import * as services from "../services";

// Create a new OrderItem
export const createNewOrderItem = async (req, res) => {
    try {
        const orderItems = req.body;
        const newOrderItem = await services.createOrderItem(orderItems);
        return res.status(201).json(newOrderItem);
    } catch (error) {
        console.error('Error in createNewOrderItem controller:', error);
        return res.status(500).json({ error: 'Failed to create order item' });
    }
};

// Get all OrderItems (with pagination)
export const fetchAllOrderItems = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const orderItemsData = await services.getAllOrderItems(page, limit);
        return res.status(200).json(orderItemsData);
    } catch (error) {
        console.error('Error in fetchAllOrderItems controller:', error);
        return res.status(500).json({ error: 'Failed to fetch order items' });
    }
};

// Get OrderItem by ID
export const fetchOrderItemById = async (req, res) => {
    try {
        const orderItemId = req.params.id;
        const orderItem = await services.getOrderItemById(orderItemId);
        return res.status(200).json(orderItem);
    } catch (error) {
        console.error('Error in fetchOrderItemById controller:', error);
        return res.status(404).json({ error: 'Order item not found' });
    }
};
export const fetchOrderItems = async (req, res) => {
    const { orderId } = req.params; // Lấy orderId từ params

    try {
        const orderItems = await services.getOrderItemByOrderId(orderId);
        res.status(200).json(orderItems); // Trả về danh sách order items
    } catch (error) {
        res.status(500).json({ message: error.message }); // Trả về lỗi nếu có
    }
};

// Update an OrderItem
export const modifyOrderItem = async (req, res) => {
    try {
        const orderItemId = req.params.id;
        const updatedData = req.body;
        const updatedOrderItem = await services.updateOrderItem(orderItemId, updatedData);
        return res.status(200).json(updatedOrderItem);
    } catch (error) {
        console.error('Error in modifyOrderItem controller:', error);
        return res.status(500).json({ error: 'Failed to update order item' });
    }
};

// Delete an OrderItem
export const removeOrderItem = async (req, res) => {
    try {
        const orderItemId = req.params.id;
        await services.deleteOrderItem(orderItemId);
        return res.status(200).json({ message: 'Order item deleted successfully' });
    } catch (error) {
        console.error('Error in removeOrderItem controller:', error);
        return res.status(500).json({ error: 'Failed to delete order item' });
    }
};
