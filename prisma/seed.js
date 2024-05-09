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
          },
          {
            type: 'debit',
            balance: 200.00,
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
      transactionType: 'deposit',
    },
  });

  await prisma.paymentHistory.create({
    data: {
      paymentAccountId: data[1].id,
      amount: 100.00,
      transactionType: 'transfer',
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
