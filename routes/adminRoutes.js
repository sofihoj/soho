const express = require('express');
const router = express.Router();

const adminController = require('../controllers/adminController');

router.get('/', adminController.administrar);
router.get('/create', adminController.create);
router.post('/create', adminController.save);
// router.get('/detail/:id', adminController.show);
router.get('/edit/:nombre', adminController.edit);
router.put('/edit/:nombre', adminController.update)
// router.put('/edit/:id', upload.single('imagen'), adminController.update);
router.get('/delete/:nombre', adminController.delete);

module.exports = router;