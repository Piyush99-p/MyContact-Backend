const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

// @desc Get all contacts
// @route GET /api/contacts
// @access public
const getContacts = asyncHandler(async (req, res) => {
    const contacts = await Contact.find({ user_id: req.user.id});
    res.status(200).json(contacts);
});

// @desc Create new contact
// @route POST /api/contacts
// @access public
const createContact = asyncHandler(async (req, res) => {
    console.log("The request body is:", req.body);
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
        res.status(400);
        throw new Error("All fields are mandatory!");
    }

    const contact = await Contact.create({
        name,
        email,
        phone,
        user_id: req.user.id
    });
    res.status(201).json(contact);
});

// @desc Get contact by ID
// @route GET /api/contacts/:id
// @access public
const getContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }
    res.status(200).json(contact);
});

// @desc Update contact
// @route PUT /api/contacts/:id
// @access public
const updateContact = asyncHandler(async (req, res) => {
    const updateContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    if (!updateContact) {
        res.status(404);
        throw new Error("Contact not found");
    }

    if(contact.user_id.toString() !==req.user.id){
        res.status(403);
        throw new Error("User don't have permission to update other user's contact");
    }
    res.status(200).json(updateContact);
});

// @desc Delete contact
// @route DELETE /api/contacts/:id
// @access public
const deleteContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }
    if(contact.user_id.toString() !==req.user.id){
        res.status(403);
        throw new Error("User don't have permission to update other user's contact");
    }
    await contact.deleteOne({_id: req.params.id }); 
    res.status(200).json({ message: "Contact deleted", contact });
});

module.exports = {
    getContacts,
    createContact,
    updateContact,
    getContact,
    deleteContact,
};
