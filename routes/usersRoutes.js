const express = require('express');
const router = express.Router();

const usersController = require('../controllers/usersController');
const validations = require('../middlewares/validations')

router.get('/login', usersController.login)
router.get('/signup', usersController.signup)
router.post('/signup', validations, usersController.processRegister)
router.post('/login', validations, usersController.processLogin)

module.exports = router;