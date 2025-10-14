//contacts router -- routes > api > contacts.js
//keep this contact router in the api folder for better organizing ( as taught in class)

//Adding express and router object 
const express = require('express');
const router = express.Router();
const Contact = require('../../models/contact'); //importing contact model

//ROUTES

//GET /api/contacts/ - List all contact in the database

//GET /api/contacts/LastName - Filter contacts by last name

//POST /api/contacts/ - Create a new contact

//PUT /api/contacts/:_id - Update a contact in the database

//DELETE /api/contacts/:_id - Delete a contact from the database




//Exporting the router object
module.exports = router;