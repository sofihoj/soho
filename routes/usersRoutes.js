const express = require('express');
const router = express.Router();

const usersController = require('../controllers/usersController');
const validationsSignUp = require('../middlewares/validationsSignUp');
const validationsLogIn = require('../middlewares/validationsLogIn');
const validationsEditProfile = require('../middlewares/validationsEditProfile');
const validationsPassword = require('../middlewares/validationsPassword');
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/login', guestMiddleware, usersController.login);
router.get('/signup', guestMiddleware, usersController.signup);
router.post('/signup', validationsSignUp, usersController.processRegister);
router.post('/login', validationsLogIn, usersController.processLogin);
router.get('/profile', authMiddleware, usersController.profile);
router.get('/profile/edit/', usersController.edit);
router.put('/profile/edit/', validationsEditProfile, usersController.update);
router.put('/profile/edit-password/', authMiddleware, validationsPassword, usersController.changePassword);
router.delete('/profile/delete', usersController.destroy)
router.get('/logout', usersController.logout);


module.exports = router;