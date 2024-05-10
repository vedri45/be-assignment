const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function createPaymentAccount(userId, type, balance) {
    return prisma.paymentAccount.create({
        data: {
            userId,
            type,
            balance
        },
    });
}

async function getPaymentAccounts(userId) {
    return prisma.paymentAccount.findMany({
        where: { userId },
    });
}

async function createPaymentHistory(accountId, amount, transactionType) {
    return prisma.paymentHistory.create({
        data: {
            paymentAccountId: accountId,
            amount: amount,
            transactionType: transactionType,
        },
    });
}

async function updatePaymentAccountBalance(accountId, amount) {
    return prisma.paymentAccount.update({
        where: { id: accountId },
        data: {
            balance: {
                increment: amount,
            },
        },
    });
}

module.exports = {
    createPaymentAccount,
    getPaymentAccounts,
    createPaymentHistory,
    updatePaymentAccountBalance,
}