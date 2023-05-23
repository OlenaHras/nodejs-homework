const { HttpError } = require("../helpers");

const validateBody = (schema) => {
  const func = (req, res, next) => {
    const { error, value } = schema.validate(req.body);
    if (Object.keys(value).length === 0) {
      next(HttpError(400, "Missing fields"));
    } else if (error) {
      const errorPathName = error.details[0].path[0];
      next(HttpError(400, `Missing required '${errorPathName}' field`));
    }
    next();
  };
  return func;
};

module.exports = validateBody;
