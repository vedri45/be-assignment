require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

function processTransaction(transaction) {
    return new Promise((resolve, reject) => {
        console.log('Transaction processing started for:', transaction);

        // Simulate long running process
        setTimeout(() => {
            // After 30 seconds, we assume the transaction is processed successfully
            console.log('transaction processed for:', transaction);
            resolve(transaction);
        }, 30000); // 30 seconds
    });
}

async function sendTransaction(req, res, next) {
    try {
        const { amount, paymentAccountId, currency } = req.body;

        if (!amount || !paymentAccountId) {
            return res.status(400).json({ error: 'Invalid request' });
        }

        const account = await prisma.paymentAccount.findUnique({
            where: { id: parseInt(paymentAccountId) },
        });

        if (!account) {
            return res.status(404).json({ error: 'Payment account not found' });
        }

        if (account.balance < amount) {
            return res.status(400).json({ error: 'Insufficient balance' });
        }

        account.balance -= amount;

        const newTransaction = {
            paymentAccountId: account.id,
            amount,
            currency,
            transactionType: 'send'
        };

        processTransaction(newTransaction)
            .then(async (processedTransaction) => {
                await prisma.paymentHistory.create({
                    data: processedTransaction,
                });

                await prisma.paymentAccount.update({
                    where: { id: account.id },
                    data: { balance: account.balance },
                });

                res.status(201).json({ message: 'Transaction successful' });
            })
            .catch(next);
    } catch (error) {
        next(error);
    }
}

async function withdrawTransaction(req, res, next) {
    try {
        const { amount, paymentAccountId, currency } = req.body;

        if (!amount || !paymentAccountId) {
            return res.status(400).json({ error: 'Invalid request' });
        }

        const account = await prisma.paymentAccount.findUnique({
            where: { id: parseInt(paymentAccountId) },
        });

        if (!account) {
            return res.status(404).json({ error: 'Payment account not found' });
        }

        if (account.balance < amount) {
            return res.status(400).json({ error: 'Insufficient balance' });
        }

        account.balance -= amount;

        const newTransaction = {
            paymentAccountId: account.id,
            amount,
            currency,
            transactionType: 'withdraw'
        };

        processTransaction(newTransaction)
            .then(async (processedTransaction) => {
                await prisma.paymentHistory.create({
                    data: processedTransaction,
                });

                await prisma.paymentAccount.update({
                    where: { id: account.id },
                    data: { balance: account.balance },
                });

                res.status(201).json({ message: 'Withdraw successful' });
            })
            .catch(next);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    sendTransaction,
    withdrawTransaction
}