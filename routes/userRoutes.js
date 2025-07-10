const express = require('express');
const router = express.Router()

//importa o controller que irá usar
const UserController = require('../controlers/userController');
const userController = require('../controlers/userController');


//usando a rota 
router.get('/', UserController.getAllUser);
router.get('/:id', userController.getUser);

module.exports = router;
