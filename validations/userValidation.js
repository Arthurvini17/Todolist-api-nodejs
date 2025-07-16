const { body } = require('express-validator');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


const userValidation = [
    body('F_name').isLength({ min: 3 }).withMessage('Nome é muito pequeno'),
    body('F_name').notEmpty().withMessage('Nome é obrigatorio')
        .custom(async (value) => {
            const user = await prisma.user.findFirst({
                where: { F_name: value }
            });
            if (user) {
                throw new Error("Nome ja está em uso");
            }
        }),
    body('L_name')
        .notEmpty().withMessage('Sobrenome é obrigatorio'),

    body('email')
        .isEmail().withMessage('Esse campo precisa ser um email').custom(async (valueEmail) => {
            const user = await prisma.user.findFirst({
                where: { email: valueEmail }
            });

            if (user) {
                throw new Error("email ja está em uso");
            }

            return true
        })

];



module.exports = userValidation;