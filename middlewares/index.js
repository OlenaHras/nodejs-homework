const { validateBody, validateFavorite } = require("./validateBody");
const isValidId = require("./isValidId");
const authenticate = require("./authenticate");

const upload = require("./upload");
module.exports = {
  validateBody,
  validateFavorite,
  isValidId,
  authenticate,
  upload,
};
