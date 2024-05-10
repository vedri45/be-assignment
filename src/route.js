const express = require('express');
const router = express.Router();
const { createPaymentAccount, getPaymentAccounts, getPaymentAccountsHistory } = require('./payment');
const { getUsers } = require('./users');
const { sendTransaction, withdrawTransaction } = require('./transaction');
const { requiresAuth } = require('express-openid-connect');

// req.isAuthenticated is provided from the auth router
router.get('/', requiresAuth(), async (req, res) => {
    res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

router.get('/users', async (req, res) => {
    const users = await getUsers();
    res.json(users);
});

router.get('/payment-accounts/', async (req, res) => {
    try {
        const paymentAccounts = await getPaymentAccounts();
        res.json(paymentAccounts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching payment accounts' });
    }
});

router.post('/payment-accounts/', async (req, res) => {
    const { userId, type, balance, currency } = req.body;
    try {
        const paymentAccount = await createPaymentAccount(userId, type, balance, currency);
        res.json(paymentAccount);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating payment account' });
    }
});

router.get('/payment-accounts/:accountId/history', async (req, res) => {
    const accountId = parseInt(req.params.accountId);

    try {
        const history = await getPaymentAccountsHistory(accountId);
        res.json(history);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching payment history' });
    }
});

router.post('/send', sendTransaction);
router.post('/withdraw', withdrawTransaction);

module.exports = router;