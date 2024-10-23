import * as services from "../services";

// Create a new transaction
export const createNewTransaction = async (req, res) => {
    try {
        const transactionData = req.body;
        const newTransaction = await services.createTransaction(transactionData);
        return res.status(201).json(newTransaction);
    } catch (error) {
        console.error('Error in createNewTransaction controller:', error);
        return res.status(500).json({ error: 'Failed to create transaction' });
    }
};

// Get all transactions
export const fetchAllTransactions = async (req, res) => {
    try {
        const transactions = await services.getAllTransactions();
        return res.status(200).json(transactions);
    } catch (error) {
        console.error('Error in fetchAllTransactions controller:', error);
        return res.status(500).json({ error: 'Failed to fetch transactions' });
    }
};

// Get transaction by ID
export const fetchTransactionById = async (req, res) => {
    try {
        const transactionId = req.params.id;
        const transaction = await services.getTransactionById(transactionId);
        return res.status(200).json(transaction);
    } catch (error) {
        console.error('Error in fetchTransactionById controller:', error);
        return res.status(404).json({ error: 'Transaction not found' });
    }
};

// Update a transaction
export const modifyTransaction = async (req, res) => {
    try {
        const transactionId = req.params.id;
        const updatedData = req.body;
        const updatedTransaction = await services.updateTransaction(transactionId, updatedData);
        return res.status(200).json(updatedTransaction);
    } catch (error) {
        console.error('Error in modifyTransaction controller:', error);
        return res.status(500).json({ error: 'Failed to update transaction' });
    }
};

// Delete a transaction
export const removeTransaction = async (req, res) => {
    try {
        const transactionId = req.params.id;
        await services.deleteTransaction(transactionId);
        return res.status(200).json({ message: 'Transaction deleted successfully' });
    } catch (error) {
        console.error('Error in removeTransaction controller:', error);
        return res.status(500).json({ error: 'Failed to delete transaction' });
    }
};
