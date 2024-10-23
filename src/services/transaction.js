import db from "../models/index";

// Create a new transaction
export const createTransaction = async (transactionData) => {
    try {
        const newTransaction = await db.Transaction.create(transactionData);
        return newTransaction;
    } catch (error) {
        console.error('Error creating transaction:', error);
        throw error;
    }
};

// Get all transactions
export const getAllTransactions = async () => {
    try {
        const transactions = await db.Transaction.findAll();
        return transactions;
    } catch (error) {
        console.error('Error fetching transactions:', error);
        throw error;
    }
};

// Get transaction by ID
export const getTransactionById = async (transactionId) => {
    try {
        const transaction = await db.Transaction.findByPk(transactionId);
        if (!transaction) {
            throw new Error('Transaction not found');
        }
        return transaction;
    } catch (error) {
        console.error('Error fetching transaction by ID:', error);
        throw error;
    }
};

// Update a transaction
export const updateTransaction = async (transactionId, updatedData) => {
    try {
        const transaction = await db.Transaction.findByPk(transactionId);
        if (!transaction) {
            throw new Error('Transaction not found');
        }
        const updatedTransaction = await transaction.update(updatedData);
        return updatedTransaction;
    } catch (error) {
        console.error('Error updating transaction:', error);
        throw error;
    }
};

// Delete a transaction
export const deleteTransaction = async (transactionId) => {
    try {
        const transaction = await db.Transaction.findByPk(transactionId);
        if (!transaction) {
            throw new Error('Transaction not found');
        }
        await transaction.destroy();
        return { message: 'Transaction deleted successfully' };
    } catch (error) {
        console.error('Error deleting transaction:', error);
        throw error;
    }
};
