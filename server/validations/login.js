const { checkSchema } = require('express-validator/check');

module.exports = checkSchema({
    email: {
        in: ['body'],
        errorMessage: 'Dirección de correo electrónico inválida',
        trim: true,
        isEmail: true,
        normalizeEmail: true,
    },
    password: {
        in: ['body'],
        isLength: {
            errorMessage: 'Escribe una contraseña',
            options: { min: 1 }
        },
    },
});
