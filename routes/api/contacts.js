const express = require("express");
const {
  getAllContacts,
  getContactById,
  addContact,
  deleteContact,
  updateContact,
  updateStatusContact,
} = require("../../controllers/contacts");
const {
  validateBody,
  validateFavorite,
  isValidId,
} = require("../../middlewares");
const { schema, updateFavoriteSchema } = require("../../schemas/contacts");

const router = express.Router();

router.get("/", getAllContacts);

router.get("/:contactId", isValidId, getContactById);

router.post("/", validateBody(schema), addContact);

router.delete("/:contactId", isValidId, deleteContact);

router.put("/:contactId", isValidId, validateBody(schema), updateContact);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validateFavorite(updateFavoriteSchema),
  updateStatusContact
);

module.exports = router;
