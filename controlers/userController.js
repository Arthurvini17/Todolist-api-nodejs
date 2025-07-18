const express = require('express');
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const Prisma = new PrismaClient();



// const users = [
//     {
//         id: '1',
//         F_name: 'Arthur',
//         L_name: 'vinicius',
//     }
// ];

module.exports = {
    //include é incluir o relacionamento de tabelas
    getAllUser: async (req, res) => {
        try {
            const user = await Prisma.user.findMany({
                include: {
                    tasks: true
                }
            })
            res.status(200).json({ message: 'Busca de usuarios:', user })
        } catch (error) {
            res.status(500).json({ message: 'Não foi possivel buscar o usuario', error })
        }
    },

    getUser: async (req, res) => {

        const { id } = req.params;

        if (!id || isNaN(id)) {
            return res.status(400).json({ message: 'ID invalido' })
        }

        try {
            const user = await Prisma.user.findUnique({
                include: {
                    tasks: true
                },
                where: { id: Number(id) },
            });
            if (!user) {
                return res.status(404).json({ message: 'usuario não existe' });
            }

            return res.status(200).json({ message: 'Usuario encontrado', user });
        } catch (error) {
            return res.status(500).json({ message: 'Não foi possivel econtrar um usuario', error })
        }
    },

    deleteUser: async (req, res) => {
        const { id } = req.params

        if (!id && isNaN) {
            res.status(400).json({ message: 'ID invalido' })
        }

        try {
            const user = await Prisma.user.delete({
                where: { id: Number(id) },
            });
            if (!user) {
                return res.status(404).json({ message: 'Usuario não encontrado' })
            }
            return res.status(200).json({ message: 'Usuario deletado com sucesso', user })
        } catch (error) {
            return res.status(500).json({ message: 'Erro!', error })
        }
    },

    createUser: async (req, res) => {
        const { F_name, L_name, email, password } = req.body;

        try {

            const hashedPassword = await bcrypt.hash(password, 10);
            const created = await Prisma.user.create({
                data: {
                    F_name,
                    L_name,
                    email,
                    password: hashedPassword
                }
            });

            return res.status(201).json({ message: 'usuario criado com sucesso', users: created });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao criar usuário', error: error.message });
        }
    },

    updateUser: async (req, res) => {
        const users = req.body;
        const { id } = req.params

        console.log('Dados recebidos para atualização:', req.body);
        try {

            const existingUser = await Prisma.user.findUnique({
                where: { id: Number(id) },
            });

            if (!existingUser) {
                return res.status(404).json({ message: 'usuario não encontrado' })
            }

            const updated = await Prisma.user.update({
                where: { id: Number(id) },
                data: users
            });

            return res.status(200).json({ message: 'usuarioa atualizado com ssucesso', users: updated });

        } catch (error) {

            return res.status(500).json({ message: 'usuario não atualizado', error });

        }
    },

    AuthUser: async (req, res) => {
        const { email, password } = req.body

        try {
            const user = await Prisma.user.findFirst({
                where: { email }
            })

            if (!user) {
                res.status(400).json({ message: 'Usuario não encontrado' })
            }

            const passwordCorrect = await bcrypt.compare(password, user.password);

            if (!passwordCorrect) {
                res.status(401).json({ message: 'Senha incorreta' });
            }

            res.status(200).json({ message: 'Login feito' });


        } catch (error) {
            res.status(500).json({ message: 'erro interno', error: error.message });
        }


    }



}