const express = require("express");
const {
  getAllContacts,
  getContactById,
  addContact,
  deleteContact,
  updateContact,
} = require("../../controllers/contacts");
const { validateBody } = require("../../middlewares");
const { schema } = require("../../schemas/contacts");

const router = express.Router();

router.get("/", getAllContacts);

router.get("/:contactId", getContactById);

router.post("/", validateBody(schema), addContact);

router.delete("/:contactId", deleteContact);

router.put("/:contactId", validateBody(schema), updateContact);

module.exports = router;
