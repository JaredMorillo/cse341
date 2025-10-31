const db = require("../database/db");
const ObjectId = require('mongodb').ObjectId; //Unique object id that Mongo assigns to each document

const getAll = async (req, res) => {
    //#swagger.tags=['Contacts']
    try {
        const result = await db.getDatabase().db().collection('contacts').find() //The correct databases's name was already included in th URL
        result.toArray().then((contacts) => {
            res.setHeader('Content-Type', 'application/json')
            res.status(200).json(contacts)
        });    
    } catch (error) {
        console.error('Connection failed', error)
        throw error
    }
};

const getSingle = async (req, res) => {
    //#swagger.tags=['Contacts']
    try {
        const contactId = new ObjectId(req.params.id);
        const result = await db.getDatabase().db().collection('contacts').findOne({_id: contactId}) //The correct databases's name was already included in th URL
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({error: "Internal Error"})
    }
};

const createContact = async (req, res) => {
    //#swagger.tags=['Contacts']
    try {
        const contact = {
            email: req.body.email,
            username: req.body.username,
            name: req.body.name,
            ipadress: req.body.ipaddress
        };
        const result = await db.getDatabase().db().collection('contacts').insertOne(contact);
        console.log("Inserted result:", result);
        res.status(201).json({ message: "New Contact Created", id: result.insertedId });
    } catch (error) {
        res.status(500).json({ error: "Internal Error" });
    }
}


const updateContact = async (req, res) => {
    //#swagger.tags=['Contacts']
    try {
        const contactId = new ObjectId(req.params.id)
        const contact = {
            email: req.body.email,
            username: req.body.username,
            name: req.body.name,
            ipadress: req.body.ipaddress
        };
        const result = await db.getDatabase().db().collection('contacts').updateOne(
            {_id: contactId},
            {$set: contact}
        );
        
        if (result.matchedCount === 0) {
            return res.status(404).send('Contact not found');
        }

        res.status(200).send('Contact updated successfully')    

    } catch (error) {
        console.error(error);
        res.status(500).send('Error updating contact');
    }
}

const deleteContact = async (req, res) => {
    //#swagger.tags=['Contacts']
    try {
        const result = await db.getDatabase().db().collection('contacts').deleteOne({_id: new ObjectId(req.params.id)});
        console.log("Deletion result:", result);
        res.status(200).send('Contact deleted successfully') 
    } catch (error) {
        console.error(error);
        res.status(500).send('Error updating contact');
    }
}

module.exports = {getAll, getSingle, createContact, updateContact, deleteContact}