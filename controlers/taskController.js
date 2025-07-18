const express = require('express');
const { PrismaClient } = require('@prisma/client');

const Prisma = new PrismaClient();

module.exports = {

    //buscar a task por id
    getTask: async (req, res) => {

        const { id } = req.params

        if (!id || isNaN(id)) {
            return res.status(400).json({ message: 'ID invalido', id })
        }
        try {
            const task = await Prisma.task.findUnique({
                where: { id: Number(id) }
            });

            if (!task) {
                return res.status(404).json({ message: 'Task não encontrada', error })
            }

            return res.status(200).json({ message: 'Task encontrada:', task })
        } catch (error) {
            return res.status(500).json({ message: 'Não foi possivel encontrar a task', error })
        }
    }

}