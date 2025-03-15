'use strict';

const { Joi } = require('express-validation')

module.exports = {
    create: {
        body: Joi.object({
            name: Joi.string()
                .min(3)
                .max(30)
                .required(),
            userId: Joi.number()
                .required()
        })
    }
}