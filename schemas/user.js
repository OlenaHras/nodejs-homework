const Joi = require("joi");

const validSubscription = ["starter", "pro", "business"];

const authSchema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().email().required(),
});

const subscriptionSchema = Joi.object({
  subscription: Joi.string().valid(...validSubscription),
});
// const loginSchema = Joi.object({
//   password: Joi.string().min(6).required(),
//   email: Joi.string().email().required(),
// });

module.exports = { authSchema, subscriptionSchema };
