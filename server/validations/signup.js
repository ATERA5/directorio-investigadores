var db = require("../models/index");
const User = require('../models/user')(db.sequelize, db.Sequelize);
const { checkSchema } = require('express-validator/check');

module.exports = checkSchema({
    names: {
        in: ['body'],
        isLength: {
            errorMessage: 'El campo "nombres" debe ser de al menos 3 caracteres y a lo más de 50',
            options: { min: 3, max: 50 }
        },
        trim: true,
    },
    last_names: {
        in: ['body'],
        isLength: {
            errorMessage: 'El campo "apellidos" debe ser de al menos 3 caracteres y a lo más de 100',
            options: { min: 3, max: 100 }
        },
        trim: true,
    },
    email: {
        in: ['body'],
        errorMessage: 'Dirección de correo electrónico inválida',
        trim: true,
        isEmail: true,
        normalizeEmail: true,
        custom: {
            options: (value) => {
                return User.findOne({
                    where: {
                        email: value,
                    }
                })
                .then((existingUser) => {
                    if (existingUser)
                        return Promise.reject('El correo electrónico ya ha sido registrado');
                    else
                        return Promise.resolve();
                });
            },
        }
    },
    password: {
        in: ['body'],
        isLength: {
            errorMessage: 'La contraseña debe ser de al menos 10 caracteres',
            options: { min: 10}
        },
    },
    passwordMatch: {
        in: ['body'],
        custom: {
            errorMessage: 'Las contraseñas no coinciden',
            options: (value, { req }) => value === req.body.password
        },
    },
    accountType: {
        in: ['body'],
        isIn: {
            errorMessage: 'El tipo de cuenta solo puede ser "estudiante" o "investigador"',
            options: [['student', 'researcher']]
        }
    },
});
