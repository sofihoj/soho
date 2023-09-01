const { body } = require('express-validator');

const validations = [
    body('email')
        .notEmpty().withMessage('Ingresa tu email').bail()
        .isEmail().withMessage('Ingrese un formato de email válido: mail@mail.com')
        .trim()
        .normalizeEmail(),
    body('password')
        .notEmpty().withMessage('Ingresa tu contraseña').bail()
]

module.exports = validations;