const express = require('express');
const router = express.Router();

const purchasesController = require('../controllers/purchasesController');

router.post('/users/profile/purchases/', purchasesController.finalizePurchase);
//router.get('/users/profile/purchase/:id', purchasesController.viewPurchaseDetails);

module.exports = router;