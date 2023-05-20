const express = require("express");
const Joi = require("joi");

const { HttpError } = require("../../helpers");
const operations = require("../../models/contacts.js");
const router = express.Router();

const schema = Joi.object({
  name: Joi.string().min(5).max(30).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().min(5).max(20).required(),
});

router.get("/", async (req, res, next) => {
  try {
    const contacts = await operations.listContacts();
    res.json(contacts);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await operations.getContactById(contactId);
    if (!contact) {
      throw HttpError(404, "Not found");
    }
    res.json(contact);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = schema.validate(req.body);
    if (error) {
      throw HttpError(400, "Missing required name field");
    }
    const newContact = await operations.addContact(req.body);
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const deletedContact = await operations.removeContact(contactId);
    if (!deletedContact) {
      throw HttpError(404, "Not found");
    }
    res.status(200).json({ message: "Contact deleted" });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { error } = schema.validate(req.body);
    if (error) {
      throw HttpError(400, "Missing fields");
    }
    const { contactId } = req.params;
    const updatedContact = await operations.updateContact(contactId, req.body);
    if (!updatedContact) {
      throw HttpError(404, "Not found");
    }
    res.json(updatedContact);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
