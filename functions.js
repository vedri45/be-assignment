async function createPaymentAccount(userId, type) {
    return prisma.paymentAccounts.create({
        data: {
            userId,
            type,
        },
    });
}

async function getPaymentAccounts(userId) {
    return prisma.paymentAccounts.findMany({
        where: { userId },
    });
}

async function updatePaymentAccountBalance(accountId, amount) {
    return prisma.paymentAccounts.update({
        where: { id: accountId },
        data: {
            balance: {
                increment: amount,
            },
        },
    });
}

module.exports = createPaymentAccount;
module.exports = getPaymentAccounts;
module.exports = updatePaymentAccountBalance;