import db from "../models/index"
// Create new OrderItem
export const createOrderItem = async (orderItemData) => {
    try {
        const newOrderItem = await db.OrderItem.create(orderItemData);
        return newOrderItem;
    } catch (error) {
        console.error('Error creating order item:', error);
        throw error;
    }
};

// Get all OrderItems with pagination
export const getAllOrderItems = async (page, limit = 10) => {
    try {
        const skip = (page - 1) * limit;
        const orderItems = await db.OrderItem.findAll({
            offset: skip,
            limit: limit,
            include: ['order', 'product'] // Include related models
        });
        const totalOrderItems = await OrderItem.count();
        const totalPages = Math.ceil(totalOrderItems / limit);

        return {
            orderItems,
            total: totalOrderItems,
            total_pages: totalPages,
            current_page: page
        };
    } catch (error) {
        console.error('Error fetching order items:', error);
        throw error;
    }
};

// Get OrderItem by ID
export const getOrderItemById = async (orderItemId) => {
    try {
        const orderItem = await db.OrderItem.findByPk(orderItemId, {
            include: ['order', 'product'] // Include related models
        });
        if (!orderItem) {
            throw new Error('Order item not found');
        }
        return orderItem;
    } catch (error) {
        console.error('Error fetching order item by ID:', error);
        throw error;
    }
};

// Update an OrderItem
export const updateOrderItem = async (orderItemId, updatedData) => {
    try {
        const orderItem = await db.OrderItem.findByPk(orderItemId);
        if (!orderItem) {
            throw new Error('Order item not found');
        }
        const updatedOrderItem = await orderItem.update(updatedData);
        return updatedOrderItem;
    } catch (error) {
        console.error('Error updating order item:', error);
        throw error;
    }
};

// Delete an OrderItem
export const deleteOrderItem = async (orderItemId) => {
    try {
        const orderItem = await db.OrderItem.findByPk(orderItemId);
        if (!orderItem) {
            throw new Error('Order item not found');
        }
        await orderItem.destroy();
        return { message: 'Order item deleted successfully' };
    } catch (error) {
        console.error('Error deleting order item:', error);
        throw error;
    }
};
