const Joi = require('joi');

const productSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    code: Joi.string().required(),
    price: Joi.number().positive().required(),
    status: Joi.boolean().required(),
    stock: Joi.number().integer().min(0).required(),
    category: Joi.string().required(),
    thumbnails: Joi.array().items(Joi.string()).required()
});

const validateProduct = (req, res, next) => {
    const { error } = productSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
};

module.exports = validateProduct;
