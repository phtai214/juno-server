import db from "../models/index"
// Create new order
export const createOrder = async (orderData) => {
    try {
        const newOrder = await db.Order.create(orderData);
        return newOrder;
    } catch (error) {
        console.error('Error creating order:', error);
        throw error;
    }
};

// Get all orders with pagination
export const getAllOrders = async (page, limit = 10) => {
    try {
        const skip = (page - 1) * limit;
        const orders = await db.Order.findAll({
            offset: skip,
            limit: limit
        });
        const totalOrders = await Order.count();
        const totalPages = Math.ceil(totalOrders / limit);

        return {
            orders,
            total: totalOrders,
            total_pages: totalPages,
            current_page: page
        };
    } catch (error) {
        console.error('Error fetching orders:', error);
        throw error;
    }
};

// Get order by ID
export const getOrderById = async (orderId) => {
    try {
        const order = await db.Order.findByPk(orderId);
        if (!order) {
            throw new Error('Order not found');
        }
        return order;
    } catch (error) {
        console.error('Error fetching order by ID:', error);
        throw error;
    }
};

// Update an order
export const updateOrder = async (orderId, updatedData) => {
    try {
        const order = await db.Order.findByPk(orderId);
        if (!order) {
            throw new Error('Order not found');
        }
        const updatedOrder = await order.update(updatedData);
        return updatedOrder;
    } catch (error) {
        console.error('Error updating order:', error);
        throw error;
    }
};

// Delete an order
export const deleteOrder = async (orderId) => {
    try {
        const order = await db.Order.findByPk(orderId);
        if (!order) {
            throw new Error('Order not found');
        }
        await order.destroy();
        return { message: 'Order deleted successfully' };
    } catch (error) {
        console.error('Error deleting order:', error);
        throw error;
    }
};
