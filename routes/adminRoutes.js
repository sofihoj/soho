const express = require('express');
const multer = require('multer')
const path = require('path');
const adminController = require('../controllers/adminController');
const router = express.Router();

function transformToCamelCase(texto) {
    return texto.replace(/\s+(\w)/g, (_, match) => match.toUpperCase());
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const categoria = req.body.categoria;
        cb(null, path.resolve(__dirname, `../public/img/${transformToCamelCase(categoria)}`));
    },
    filename: (req, file, cb) => {
        const nombreProducto = req.body.nombre;
        const nombreArchivo = `${nombreProducto.toLowerCase()}-${Date.now()}${path.extname(file.originalname)}`;
        cb(null, nombreArchivo);
    }
});

const upload = multer({ storage })



router.get('/', adminController.administrar);
router.get('/create', adminController.create);
router.post('/create', upload.single('imagen'), adminController.save);
// router.get('/detail/:id', adminController.show);
router.get('/edit/:nombre', adminController.edit);
router.put('/edit/:nombre', upload.single('imagen'), adminController.update)
router.get('/delete/:nombre', adminController.delete);

module.exports = router;