import Contact from "../models/contact.model.js";

// get all the contacts

export const getAllContacts = async (req , res ) => {
    try {
        const contacts = await Contact.find();
        res.status(200).json (contacts);
    }   catch (err) {
        res.status(500).json({message: "Error fetching contacts", error: err});
    }
};

// get by ID
export const getContactById = async (req , res ) => {
    try {
        const contact = await Contact.findById(req.params.id);
        if (!contact) return res.status(404).json ({ message: "Contact not found"});
        res.status(200).json (contact);
    }   catch (err) {
        res.status(500).json({message: "Error fetching contact", error: err});
    }
};

// post new

export const createContact = async (req, res) => {
    try {
        const newContact = new Contact (req.body);
        await newContact.save();
        res.status(201).json(newContact);
    }   catch (err) {
        res.status(400).json ({message: "Error creating contact", error: err});
    }
};

//Put update

export const updateContact = async (req , res ) => {
    try {
        const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if (!contact) return res.status(404).json ({ message: "Contact not found"});
        res.status(200).json (contact);
    }   catch (err) {
        res.status(400).json({message: "Error updating contact", error: err});
    }
};

// delete by id

export const deleteContact = async (req , res ) => {
    try {
        const contact = await Contact.findByIdAndDelete(req.params.id);
        if (!contact) return res.status(404).json ({ message: "Contact not found"});
        res.status(200).json ({ message: "Contact deleted"});
    }   catch (err) {
        res.status(500).json({message: "Error deleting contact", error: err});
    }
};

// deletee all

export const deleteAllContacts = async (req , res ) => {
    try {
        await Contact.deleteMany({});
        res.status(200).json({ message: "All Contacts deleted"});
    }   catch (err) {
        res.status(500).json({message: "Error deleting all contacts", error: err});
    }
};