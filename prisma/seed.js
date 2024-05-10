const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function seed() {
  // Create users
  const alice = await prisma.user.create({
    data: {
      name: 'alice',
      paymentAccounts: {
        create: [
          {
            type: 'credit',
            balance: 1000.00,
            currency: 'USD',
          },
          {
            type: 'debit',
            balance: 200.00,
            currency: 'USD',
          },
        ],
      },
    },
  });
  
  const data = await prisma.paymentAccount.findMany();

  await prisma.paymentHistory.create({
    data: {
      paymentAccountId: data[0].id,
      amount: 200.00,
      currency: 'USD',
      transactionType: 'send',
    },
  });

  await prisma.paymentHistory.create({
    data: {
      paymentAccountId: data[1].id,
      amount: 100.00,
      currency: 'USD',
      transactionType: 'withdraw',
    },
  });

  console.log(`Seeded database with ${alice.auth0Id}`);
}

seed()
  .catch(async (e) => {
    console.error('Seeding failed:', e);
    await prisma.$disconnect();
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
