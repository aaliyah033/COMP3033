//contacts router -- routes > api > contacts.js
//keep this contact router in the api folder for better organizing ( as taught in class)

//Adding express and router object 
const express = require('express');
const router = express.Router();
const Contact = require('../../models/contact'); //importing contact model

//ROUTES

//GET /api/contacts/ - List all contact in the database
router.get("/", async (req, res, next) => {
    let contacts = await Contact.find(); //will find all the contacts in the database
    res.status(200).json(contacts); //sends back the contacts in json format
});

//GET /api/contacts/LastName - Filter contacts by last name
router.get("/:lastName", async (req, res, next) => {
    let contacts = await Contact.find({
        lastName: req.params.lastName}); //will find all the contacts in the database with the last name
    res.status(200).json(contacts); //sends back the contacts in json format
}); 

    // middleName: { type: String },
    // lastName: { type: String, required: true },
    // emailAddress: { type: String, required: true },
    // phoneNumber: { type: String },
    // addressLine1: { type: String },
    // addressLine2: { type: String },
    // province: { type: String },
    // postcode: { type: String },
    // country: { type: String },

//POST /api/contacts/ - Create a new contact
router.post("/", async (req,res,next) => {
    //validating the required fields
    if (!req.body.lastName){
        res.status(400).json({ValidationError: "Last Name is required"});
    }
    else if (!req.body.emailAddress){
        res.status(400).json({ValidationError: "Email Address is required"});
    } 
    else {
        try {
            //Creating a new contact object in database
            let newContact = await Contact.create({
                middleName: req.body.middleName,
                lastName: req.body.lastName,
                emailAddress: req.body.emailAddress,
                phoneNumber: req.body.phoneNumber,
                addressLine1: req.body.addressLine1,
                addressLine2: req.body.addressLine2,
                province: req.body.province,
                postcode: req.body.postcode,
                country: req.body.country
            });
            res.status(200).json(newContact); //sends backs the new contact in json format
        }
        catch (err) { //will catch any server errors
            console.log(err); //checks logs the error to the console
            res.status(500).json({ErrorMessage: "The Server threw an exception"}); //sends back the error in json format
        }
    }
});
    

//PUT /api/contacts/:_id - Update a contact in the database
router.put("/:_id", async (req,res,next) => {
    //validating the required fields 
    if (!req.body.lastName){
        res.json({ValidationError: "Last Name is required"}).status(400);
    }
    else if (!req.body.emailAddress){
        res.json({ValidationError: "Email Address is required"}).status(400);
    } 
    else {
        try{
            let updatedContact = {
                middleName: req.body.middleName,
                lastName: req.body.lastName,
                emailAddress: req.body.emailAddress,
                phoneNumber: req.body.phoneNumber,
                addressLine1: req.body.addressLine1,
                addressLine2: req.body.addressLine2,
                province: req.body.province,
                postcode: req.body.postcode,
                country: req.body.country
            };
            await Contact.findOneAndUpdate(
                {_id: req.params._id}, //this is to finding the contact by id
                updatedContact //this is the updated contact object
            );
            res.status(200).json(updatedContact); //sends back the updated contact in json format
        } catch (err){ //will catch any server errors
            console.log(err); //checks logs the error to the console
            res.status(500).json({ErrorMessage: "The Server threw an exception"}); //sends back the error in json format
        }
    }
});

//DELETE /api/contacts/:_id - Delete a contact from the database
router.delete("/:_id", async (req, res, next) => {
    try {
        await Contact.deleteOne({ _id: req.params._id });
        res.status(200).json({ success: "true" });
      } catch (err) {
        console.log(err);
        res.status(500).json({ ErrorMessage: "Server threw an exception" });
      }
});


//Exporting the router object
module.exports = router;