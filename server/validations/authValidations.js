'use strict';

const { Joi } = require('express-validation')

module.exports = {
    create: {
        body: Joi.object({
            email: Joi.string()
                .required(),
            username: Joi.string()
                .alphanum()
                .min(3)
                .max(30)
                .required(),
            password: Joi.string()
                .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
                .required(),
            passwordConfirmation: Joi.string()
                // .custom((value, { req }) => {
                //     return value === req.body.password
                // })
                .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
                .required()
        })
    },
    login: {
        body: Joi.object({
            email: Joi.string()
                .required(),
            password: Joi.string()
                .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
        })
    }
}