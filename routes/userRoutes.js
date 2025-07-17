const express = require('express');
const router = express.Router()

//importa o controller que irá usar
const userValidation = require('../validations/userValidation');
const { validationResult } = require('express-validator');
const userController = require('../controlers/userController');


//usando a rota 
router.get('/', userController.getAllUser);
router.get('/:id', userController.getUser);
router.delete('/:id', userController.deleteUser);
router.put('/:id', userController.updateUser);


router.post('/', userValidation, (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    userController.createUser(req, res);
});




module.exports = router;
