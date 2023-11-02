const express = require('express');
const router = express.Router();

const mainController = require('../controllers/mainController');

router.get('/', mainController.index);
router.get('/productCart', mainController.productCart);
router.get('/categories/:categoria', mainController.categories);
router.get('/products', mainController.allProducts);
router.get('/products/:category/:product', mainController.productDetail);
router.get('/search', mainController.search);

module.exports = router;