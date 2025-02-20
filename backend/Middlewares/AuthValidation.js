const Joi = require("joi");
// schema that validates the sign up data.
const signupValidation = (req, res, next) => {
  const schema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(8),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(403).send(error.details[0].message);
  }
  next();
};
// schema that validates the login up data.
const loginValidation = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(8),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  next();
};

module.exports = {
  signupValidation,
  loginValidation,
};
