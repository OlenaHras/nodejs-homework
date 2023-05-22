const { HttpError, ctrlWrapper } = require("../helpers");
const operations = require("../models/contacts");

const getAllContacts = async (req, res) => {
  const contacts = await operations.listContacts();
  res.json(contacts);
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const contact = await operations.getContactById(contactId);
  if (!contact) {
    throw HttpError(404, "Not found");
  }
  res.json(contact);
};

const addContact = async (req, res) => {
  const newContact = await operations.addContact(req.body);
  res.status(201).json(newContact);
};

const deleteContact = async (req, res) => {
  const { contactId } = req.params;
  const deletedContact = await operations.removeContact(contactId);
  if (!deletedContact) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json({ message: "Contact deleted" });
};

const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const updatedContact = await operations.updateContact(contactId, req.body);
  if (!updatedContact) {
    throw HttpError(404, "Not found");
  }
  res.json(updatedContact);
};

module.exports = {
  getAllContacts: ctrlWrapper(getAllContacts),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  deleteContact: ctrlWrapper(deleteContact),
  updateContact: ctrlWrapper(updateContact),
};
