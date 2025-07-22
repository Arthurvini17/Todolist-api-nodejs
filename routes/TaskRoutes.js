const express = require('express');
const router = express.Router()


const taskController = require('../controlers/taskController');

router.get('/:id', taskController.getTask);
router.get('/', taskController.getAllTasks);
router.delete('/:id', taskController.deleteTask);

module.exports = router;
