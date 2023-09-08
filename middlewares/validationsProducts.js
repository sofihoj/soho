const { body } = require('express-validator');

const validations = [
    body('nombre')
        .notEmpty().withMessage('Campo obligatorio').bail()
        .custom(value => {
            // Expresión regular para verificar que no hay solo números y caracteres especiales
            if (/^[0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/.test(value)) {
                throw new Error('El nombre no puede consistir solo de números y/o caracteres especiales');
            }
            return true;
        })
        .trim(),
    body('descripcion')
        .custom(value => {
            // Expresión regular para verificar que no hay solo números y caracteres especiales
            if (/^[0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/.test(value)) {
            throw new Error('El nombre no puede consistir solo de números y/o caracteres especiales');
            }
            return true;
        })
        .trim(),
    body('precio')
        .notEmpty().withMessage('Campo obligatorio').bail()
        .isNumeric().withMessage('Ingrese sólo números').bail()
        .trim(),
    body('cateogoria')
        .notEmpty().withMessage('Elije una categoría').bail()

]

module.exports = validations;