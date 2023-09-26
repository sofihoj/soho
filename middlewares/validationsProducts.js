const { body } = require('express-validator');
const path = require('path');

const validations = [
    body('nombre')
        .notEmpty().withMessage('Campo obligatorio').bail()
        .isLength({min: 2}).withMessage('Mínimo 2 caracteres').bail()
        .custom(value => {
            if (/^[0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/.test(value)) {
                throw new Error('El nombre no puede consistir solo de números y/o caracteres especiales');
            }
            return true;
        })
        .trim(),
    body('descripcion')
        .isLength({max: 200}).withMessage('Máximo 200 caracteres').bail()
        .custom(value => {
            if (value && /^[0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/.test(value)) {
                throw new Error('La descripción no puede consistir solo de números y/o caracteres especiales');
            }
            return true;
        })
        .trim(),
    body('precio')
        .notEmpty().withMessage('Campo obligatorio').bail()
        .isNumeric().withMessage('Ingrese sólo números').bail()
        .trim(),
    body('categoria')
        .notEmpty().withMessage('Ingrese una categoría').bail(),
    body('imagen').custom((value, { req }) => {
		let file = req.file;
		let acceptedExtensions = ['.jpg', '.png', '.jpeg'];

		if (!file) {
			throw new Error('Imagen obligatoria');
		} else {
			let fileExtension = path.extname(file.originalname);
			if (!acceptedExtensions.includes(fileExtension)) {
				throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`);
			}
		}

		return true;
	})

]

module.exports = validations;