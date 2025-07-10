const express = require('express');
const { PrismaClient } = require('@prisma/client');



const Prisma = new PrismaClient();



// const users = [
//     {
//         id: '1',
//         F_name: 'Arthur',
//         L_name: 'vinicius',
//     }
// ];

module.exports = {
    getAllUser: async (req, res) => {
        try {
            const user = await Prisma.user.findMany({})
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
                where: { id: Number(id) },
            });
            if (!user) {
                return res.status(404).json({ message: 'usuario não existe' });
            }

            return res.status(201).json({ message: 'Usuario encontrado', user });
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
    }
}