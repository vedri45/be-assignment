const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function createPaymentAccount(userId, type, balance, currency) {
    return prisma.paymentAccount.create({
        data: {
            userId,
            type,
            balance,
            currency
        },
    });
}

async function getPaymentAccounts(userId) {
    return prisma.paymentAccount.findMany({
        where: { userId },
    });
}

async function getPaymentAccountsHistory(accountId) {
    return prisma.paymentHistory.findMany({
        where: { paymentAccountId: accountId },
    });
}

module.exports = {
    createPaymentAccount,
    getPaymentAccounts,
    getPaymentAccountsHistory
}