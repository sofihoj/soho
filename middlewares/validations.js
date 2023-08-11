const { body } = require('express-validator')

const validations = [
    body('name')
        .notEmpty().withMessage('Campo obligatorio').bail() //bail() si tengo un error en la 1er validacion, no sigo con las siguientes
        .isLength({ min: 3, max: 40 }).withMessage('El nombre debe tener entre 3 y 40 caracteres').bail()
        .custom(value => {
            // Expresión regular para verificar que no hay solo números y caracteres especiales
            if (/^[0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/.test(value)) {
              throw new Error('El nombre no puede consistir solo de números y/o caracteres especiales');
            }
            return true;
          })
          .trim(),
    body('lastName')
        .notEmpty().withMessage('Campo obligatorio').bail()
        .isLength({ min: 3, max: 40 }).withMessage('El apellido debe tener entre 3 y 40 caracteres').bail()
        .custom(value => {
            if (/^[0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/.test(value)) {
              throw new Error('El apellido no puede consistir solo de números y/o caracteres especiales');
            }
            return true;
          })
          .trim(),
    body('email')
        .notEmpty().withMessage('Campo obligatorio').bail()
        .isEmail().withMessage('Ingrese un formato de email válido: mail@mail.com')
        .trim()
        .normalizeEmail(),
    body('phoneNumber')
        .notEmpty().withMessage('Campo obligatorio').bail()
        .isNumeric().withMessage('Ingrese sólo números').bail()
        .isLength({ min: 7, max: 15 }).withMessage('El número de teléfono debe tener entre 7 y 15 dígitos')
        .trim(),
    body('city')
        .notEmpty().withMessage('Campo obligatorio').bail()
        .isLength({ min: 3, max: 40 }).withMessage('La ciudad debe tener entre 3 y 40 caracteres').bail()
        .custom(value => {
            if (/^[0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/.test(value)) {
            throw new Error('La ciudad no puede consistir solo de números y/o caracteres especiales');
            }
            return true;
        })
        .trim(),
    body('address')
        .notEmpty().withMessage('Campo obligatorio').bail()
        .isLength({ min: 3, max: 50 }).withMessage('La dirección debe tener entre 3 y 50 caracteres').bail()
        .custom(value => {
            if (/^[0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/.test(value)) {
            throw new Error('La dirección no puede consistir solo de números y/o caracteres especiales');
            }
            return true;
        })
        .trim(),
    body('password')
        .notEmpty().withMessage('Campo obligatorio').bail()
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
        .withMessage('La contraseña debe tener al menos 8 caracteres y contener al menos una letra mayúscula, una minúscula, un número y un carácter especial'),
    body('passwordRepeat')
        .notEmpty().withMessage('Campo obligatorio').bail()
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Las contraseñas no coinciden');
            }
            return true;
        }),
]

module.exports = validations;