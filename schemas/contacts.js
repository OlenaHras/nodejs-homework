const Joi = require("joi");

const schema = Joi.object({
  name: Joi.string().min(5).max(30).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().min(5).max(20).required(),
  favorite: Joi.boolean(),
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

module.exports = { schema, updateFavoriteSchema };
