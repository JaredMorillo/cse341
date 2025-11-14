const db = require("../database/db");
const { ObjectId } = require('mongodb');

const getAll = async (req, res) => {
    try {
        const lists = await db.getDatabase().collection('contacts').find().toArray();
        res.status(200).json(lists);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching contacts', error: err.message });
    }
};

const getSingle = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ error: 'Must use a valid contact id' });
    }
    try {
        const contactId = new ObjectId(req.params.id);
        const result = await db.getDatabase().collection('contacts').findOne({ _id: contactId });
        if (!result) return res.status(404).json({ message: 'Contact not found' });
        res.status(200).json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching contact', error: err.message });
    }
};

const createContact = async (req, res) => {
    try {
        const contact = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            favoriteColor: req.body.favoriteColor,
            birthday: req.body.birthday
        };
        const response = await db.getDatabase().collection('contacts').insertOne(contact);
        res.status(201).json(response);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error creating contact', error: err.message });
    }
};

const updateContact = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ error: 'Must use a valid contact id' });
    }
    try {
        const contactId = new ObjectId(req.params.id);
        const contact = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            favoriteColor: req.body.favoriteColor,
            birthday: req.body.birthday
        };
        const response = await db.getDatabase().collection('contacts').replaceOne({ _id: contactId }, contact);
        if (response.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Contact not found or no changes made' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error updating contact', error: err.message });
    }
};

const deleteContact = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ error: "Invalid contact ID" });
    }
    try {
        const contactId = new ObjectId(req.params.id);
        const result = await db.getDatabase().collection('contacts').deleteOne({ _id: contactId });
        if (result.deletedCount > 0) {
            res.status(200).json({ message: 'Contact deleted successfully' });
        } else {
            res.status(404).json({ message: 'Contact not found' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error deleting contact', error: err.message });
    }
};

module.exports = { getAll, getSingle, createContact, updateContact, deleteContact };
