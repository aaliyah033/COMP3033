//routes/api/spareparts.js

//Import required modules express, and router object 
const express = require('express');
const router = express.Router();
require('dotenv').config(); //for the nodemailer

//ADDED - import nodmailer for email notifications
const nodemailer = require('nodemailer');

//Import the SparePart model object
const SparePart = require("../../models/autosparepart");

//NodeMailer email Transporter configuration
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "aaliyahali0727@gmail.com",
      pass: process.env.GOOGLE_APP_PASSWORD,
    },
  });

//ADDED - Function to send email when stock is low 
async function sendLowStockEmail(part) {
(async () => {
    try {
        const info = await transporter.sendMail({
        from: '"Owner" <aaliyahali0727@gmail.com>',
        to: "aaliyahhr003@gmail.com>",
        subject: `IMPORTANT! Low Stock Alert: ${part.name}`, //subject
        text: `The low stock Alert\n\nItem: ${part.name} \nSpare Number: ${part.spareNumber}\nRemaining Quantity only left: ${part.quantity}\n\n Please restock soon!`, //text body
        });
        console.log("Message sent:", info.messageId);

        } catch (error) {
        console.log("Error occurred. " + error.message);
        }
    })();
}

//ADDED - Swagger for GET /api/spareparts

/**
 * @openapi
 * /api/spareparts:
 *   get:
 *     description: Lists all spare parts in the database, by name or number or both
 *     responses:
 *       200:
 *         description: Returns a list of all spare parts.
 */

// GET api/spareparts/ - parameters: None or Name or Number or both 
//I want to achieve: 
    // by name - /api/spareparts?name=partname
    // by number - /api/spareparts?number=partnumber
    // by both - /api/spareparts?name=partname&number=partnumber
    // all parts - /api/spareparts/

router.get("/", async (req, res) => {
    try {
    //empty query object based on which to build the query on name or number
    const query = {};
    if (req.query.name) {
        query.name = req.query.name;
    }
    if (req.query.number) {
        query.number = req.query.number;
    }
    const spareParts = await SparePart.find(query);
    //sending back as JSON
    res.status(200).json(spareParts);
    } catch (error) { // catch any server errors
      res.status(500).json({ ErrorMessage: "Server threw an exception" }); 
}
});

//ADDED - Swagger POST /api/spareparts

/**
 * @openapi
 * /api/spareparts:
 *   post:
 *     description: Adds a new spare part
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - spareNumber
 *               - quantity
 *               - price
 *             properties:
 *               name:
 *                 type: string
 *               spareNumber:
 *                 type: string
 *               quantity:
 *                 type: number
 *               color:
 *                 type: string
 *               price:
 *                 type: number
 *               position:
 *                 type: string
 *                 enum: ["left", "right"]
 *               supplyCountry:
 *                 type: string
 *     responses:
 *       200:
 *         description: Spare part created successfully
 */

// POST api/spareparts - parameters: JSON object containing spare parts information
//Adds a new spare part in the database
// name: { type: String, required: true },
// spareNumber: { type: String, required: true },
// quantity: { type: Number, required: true },
// color: { type: String },
// price: { type: Number, required: true },
// position: { type: String, enum: ["left", "right"] },
// supplyCountry: { type: String }

router.post("/", async (req, res) => {
    //validating required fields 
    if (!req.body.name){
        res.status(400).json({ValidationError: "Name is a required field"});
    } else if (!req.body.spareNumber){
        res.status(400).json({ValidationError: "Spare Number is a required field"});
    } else if (req.body.quantity == null){
        res.status(400).json({ValidationError: "Quantity is a required field"});
    } else if (req.body.price == null){
        res.status(400).json({ValidationError: "Price is a required field"});
    } else {
        try {
            //create a new SparePart object in the databse 
            const newSparePart = await SparePart.create({
                name: req.body.name,
                spareNumber: req.body.spareNumber,
                quantity: req.body.quantity,
                color: req.body.color,
                price: req.body.price,
                position: req.body.position,
                supplyCountry: req.body.supplyCountry
            });

        //ADDED - check if quantity is less than 3 to send low stock email
        if (newSparePart.quantity < 3) {
            //send low stock email notification
           await sendLowStockEmail(newSparePart);
        }

        //send back the newly created saved spare part as JSON
          res.status(200).json(newSparePart);
        } catch (error) { // catch any server errors
          res.status(500).json({ ErrorMessage: "Server threw an exception" });
        }
    }
});


//ADDED - Swagger PUT /api/spareparts/:_id

/**
 * @openapi
 * /api/spareparts/{id}:
 *   put:
 *     description: Updates an existing spare part
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Spare part ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - spareNumber
 *               - quantity
 *               - price
 *             properties:
 *               name:
 *                 type: string
 *               spareNumber:
 *                 type: string
 *               quantity:
 *                 type: number
 *               color:
 *                 type: string
 *               price:
 *                 type: number
 *               position:
 *                 type: string
 *                 enum: ["left", "right"]
 *               supplyCountry:
 *                 type: string
 *     responses:
 *       200:
 *         description: Spare part updated successfully
 */

// PUT api/spareparts/:_id - parameters: Id: spare parts ID to update, JSON object containing updated information
//remember: with the spare ID - api/spareparts/:_id

router.put("/:_id", async (req, res) => {
    //validating required fields
    if (!req.body.name){
        res.status(400).json({ValidationError: "Name is a required field"});
    } else if (!req.body.spareNumber){
        res.status(400).json({ValidationError: "Spare Number is a required field"});
    } else if (req.body.quantity == null){
        res.status(400).json({ValidationError: "Quantity is a required field"});
    } else if (req.body.price == null){
        res.status(400).json({ValidationError: "Price is a required field"});
    } else { 
        //updating the spare part in the database
        try {
            const updatedSparePart = {
                    name: req.body.name,
                    spareNumber: req.body.spareNumber,
                    quantity: req.body.quantity,
                    color: req.body.color,
                    price: req.body.price,
                    position: req.body.position,
                    supplyCountry: req.body.supplyCountry
                };
                //find the spare part by ID and update it
                await SparePart.findOneAndUpdate(
                    { _id: req.params._id }, // filter query by _id
                    updatedSparePart
                );

            //ADDED - check if quantity is less than 3 to send low stock email
            if (updatedSparePart.quantity < 3) {
                //send low stock email notification
                await sendLowStockEmail(updatedSparePart);
            }
            //send back the updated spare part as JSON
            res.status(200).json(updatedSparePart);
            } catch (error) { // catch any server errors
            res.status(500).json({ ErrorMessage: "Server threw an exception" });
            }
    }
});

//ADDED - Swagger DELETE /api/spareparts/:_id

/**
 * @openapi
 * /api/spareparts/{id}:
 *   delete:
 *     description: Deletes a spare part using its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Spare part ID
 *     responses:
 *       200:
 *         description: Spare part deleted successfully
 */

// DELETE api/spareparts/:_id - parameters: Id: spare parts ID to be deleted

router.delete("/:_id", async (req, res) => {
    try {
    //find the spare part by ID and delete it
    await SparePart.deleteOne({ _id: req.params._id });
    //send back success message as JSON
    res.status(200).json({ success: "true" });
  } catch (error) { // catch any server errors
    res.status(500).json({ ErrorMessage: "Server threw an exception" }); 
}
});

//export the router object
module.exports = router;