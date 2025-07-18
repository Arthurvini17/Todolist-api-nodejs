const express = require('express');
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const Prisma = new PrismaClient();

const prisma = new PrismaClient();

async function main() {
    const user = await prisma.user.create({
        data: {
            F_name: "Teste",
            L_name: "User",
            email: "teste@exemplo.com",
            password: "123456",
        },
    });
    console.log(user);
}

main()
    .catch(e => console.error(e))
    .finally(() => prisma.$disconnect());
