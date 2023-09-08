const { body } = require('express-validator');

const validations = [
    body('password')
        .notEmpty().withMessage('Campo obligatorio').bail(),
    body('newPassword')
        .notEmpty().withMessage('Campo obligatorio').bail()
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
        .withMessage('La contraseña debe tener al menos 8 caracteres y contener al menos una letra mayúscula, una minúscula, un número y un carácter especial'),
    body('passwordRepeat')
        .notEmpty().withMessage('Campo obligatorio').bail()
        .custom((value, { req }) => {
            if (value !== req.body.newPassword) {
                throw new Error('Las contraseñas no coinciden');
            }
            return true;
        }),
]

module.exports = validations;