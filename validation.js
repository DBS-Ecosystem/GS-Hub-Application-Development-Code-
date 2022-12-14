const Joi = require('joi');

module.exports = {
    registration: Joi.object({
        type: Joi.string().required(),
        phone: Joi.string().required(),
        login: Joi.string().min(6).max(50).required(),
        password: Joi.string().min(6).required(),
        email: Joi.string().min(6).required().email(),
        name: Joi.string().max(20).required(),
        surname: Joi.string().max(20).required(),
        country: Joi.string().required(),
        city: Joi.string().required()
    }),
    login: Joi.object({
        login: Joi.string().min(6).required(),
        password: Joi.string().min(6).required()
    }),
    update: Joi.object({
        login: Joi.string().min(6),
        password: Joi.string().min(6)
    }).or('login', 'password'),
    support: Joi.object({
        topic: Joi.string().allow(''),
        message: Joi.string().required()
    }),
    private: Joi.object({
        email: Joi.string().min(6).email(),
        phone: Joi.string(),
        website: Joi.string(),
        language: Joi.object({
            name: Joi.string(),
            level: Joi.string()
        })
    }).or('email', 'phone', 'website', 'lanuage'),
    profile: {
        SPO: Joi.object({
            about: Joi.string().required()
        }),
        SME: Joi.object({
            about: Joi.string().required()
        })
    },
    avatar: Joi.binary()
}