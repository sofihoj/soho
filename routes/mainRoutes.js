const express = require('express');
const router = express.Router();

const mainController = require('../controllers/mainController');

router.get('/', mainController.index);
router.get('/index', mainController.index);
router.get('/login', mainController.login);
router.get('/signup', mainController.signup);
router.get('/newProducts', mainController.newProducts);
router.get('/productCart', mainController.productCart);
router.get('/categories/:categoria', mainController.categories);
router.get('/products/:category/:product', mainController.productDetail);


module.exports = router;