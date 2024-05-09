const express = require('express');
const router = express.Router();
const createPaymentAccount = require('./functions');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { requiresAuth } = require('express-openid-connect');

// req.isAuthenticated is provided from the auth router
router.get('/', (req, res) => {
    res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

router.get('/profile', requiresAuth(), (req, res) => {
    res.send(JSON.stringify(req.oidc.user));
});

router.get('/users', async (req, res) => {
    const users = await prisma.user.findMany()
    res.json(users)
})

router.get('/payment-accounts', async (req, res) => {
    const userId = req.oidc.user.sid;  // Assuming user ID obtained from Auth0

    try {
        const paymentAccounts = await prisma.paymentAccount.findMany();
        res.json(paymentAccounts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching payment accounts' });
    }
});

router.post('/payment-accounts', async (req, res) => {
    const { userId, type } = req.body;  // Assuming data comes from request body
    try {
        const paymentAccount = await createPaymentAccount(userId, type);
        res.json(paymentAccount);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating payment account' });
    }
});

router.get('/payment-accounts/:accountId/history', async (req, res) => {
    const accountId = req.params.accountId;

    try {
        const history = await prisma.paymentHistory.findMany({
            where: { paymentAccountId: accountId },
        });
        res.json(history);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching payment history' });
    }
});

router.post('/payment-accounts/:accountId/history', async (req, res) => {
    const accountId = req.params.accountId;
    const { amount, transactionType } = req.body;
  
    try {
      // Check if account exists
      const account = await prisma.paymentAccounts.findUnique({
        where: { id: accountId },
      });
  
      if (!account) {
        return res.status(404).json({ message: 'Payment account not found' });
      }
  
      const paymentHistory = await createPaymentHistory(accountId, amount, transactionType);
      res.json(paymentHistory);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error creating payment history' });
    }
  });

module.exports = router;