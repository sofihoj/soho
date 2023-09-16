const express = require('express');
const multer = require('multer')
const path = require('path');
const adminController = require('../controllers/adminController');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const validationsProducts = require('../middlewares/validationsProducts')

function formatearEspacio(categoryName) {
    return categoryName.replace(' ', '-').toLowerCase();
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.resolve(__dirname, `../public/img`));
    },
    filename: (req, file, cb) => {
        const nombreProducto = req.body.nombre;
        const nombreArchivo = `${formatearEspacio(nombreProducto)}-${Date.now()}${path.extname(file.originalname)}`;
        cb(null, nombreArchivo);
    }
});

const upload = multer({ storage })



router.get('/', authMiddleware, adminController.administrar);
router.get('/create', authMiddleware, adminController.create);
router.post('/create', validationsProducts, upload.single('imagen'), adminController.save);
// router.get('/detail/:id', adminController.show);
router.get('/edit/:nombre', adminController.edit);
router.put('/edit/:nombre', upload.single('imagen'), adminController.update)
router.get('/delete/:nombre', adminController.delete);

module.exports = router;