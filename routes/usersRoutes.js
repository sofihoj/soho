const express = require('express');
const router = express.Router();

const usersController = require('../controllers/usersController');
const validations = require('../middlewares/validations');
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/login', guestMiddleware, usersController.login)
router.get('/signup', guestMiddleware, usersController.signup)
router.post('/signup', validations, usersController.processRegister)
router.post('/login', usersController.processLogin)
router.get('/profile', authMiddleware, usersController.profile)
// router.get('/profile/info/', usersController.edit)
router.get('/logout', usersController.logout)


module.exports = router;