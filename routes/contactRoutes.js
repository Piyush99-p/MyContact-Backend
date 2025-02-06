const express = require("express");
const router = express.Router();
const { getContacts, 
    createContact, 
    updateContact, 
    getContact, 
    deleteContact 
} = require("../controllers/contactController");
const validateToken = require("../middleware/validateTokenHandler");

router.use(validateToken);
// Route to get all contacts and create a new contact
router.route("/").get(getContacts).post(createContact);

// Route to get, update, and delete a specific contact by ID
router.route("/:id").get(getContact).put(updateContact).delete(deleteContact);

module.exports = router;
