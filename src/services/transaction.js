import db from "../models/index";
import axios from 'axios';
import crypto from 'crypto';

const partnerCode = 'MOMO';
const accessKey = 'F8BBA842ECF85';
const secretKey = 'K951B6PE1waDMi640xX08PD3vg6EkVlz';

export const createPayment = async (amount, orderInfo, redirectUrl, ipnUrl) => {
    const requestId = partnerCode + new Date().getTime();
    const orderId = requestId;
    const requestType = 'captureWallet';
    const extraData = '';

    const rawSignature = `accessKey=${accessKey}&amount=${amount}&extraData=${extraData}&ipnUrl=${ipnUrl}&orderId=${orderId}&orderInfo=${orderInfo}&partnerCode=${partnerCode}&redirectUrl=${redirectUrl}&requestId=${requestId}&requestType=${requestType}`;

    const signature = crypto.createHmac('sha256', secretKey).update(rawSignature).digest('hex');

    const requestBody = {
        partnerCode,
        accessKey,
        requestId,
        amount,
        orderId,
        orderInfo,
        redirectUrl,
        ipnUrl,
        extraData,
        requestType,
        signature,
        lang: 'vi',
    };

    try {
        const response = await axios.post('https://test-payment.momo.vn/v2/gateway/api/create', requestBody);
        return response.data;
    } catch (error) {
        throw new Error('Payment processing error: ' + error.message);
    }
};

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
