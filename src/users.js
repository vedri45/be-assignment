require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function getUsers() {
    return prisma.user.findMany();
}

module.exports = {
    getUsers
}
