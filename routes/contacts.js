const express = require("express")
const router = require("express").Router();

const contactsController = require("../controllers/contacts")

//Gets all contacts
router.get('/', contactsController.getAll)

//Gets individual contact by id
router.get('/:id', contactsController.getSingle)

//Inserts a new contact
router.post('/', contactsController.createContact)

//Update an existing contact
router.put('/:id', contactsController.updateContact)

//Delete an existing contact
router.delete('/:id', contactsController.deleteContact)

module.exports = router