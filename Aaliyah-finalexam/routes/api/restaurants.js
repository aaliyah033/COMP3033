const express = require('express');
const router = express.Router();
//import 
const Restaurant = require('../../models/restaurant');

// name: { type: String, required: true },
// address: { type: String, required: true },
// phoneNumber: { type: String, required: true },
// emailAddress: { type: String, required: true },
// rating: { type: Number, required: true, min: 1, max: 10 }

//GET /api/restaurants   parameters : NONE - List all restaurants in the database (unfiltered)
//IN GET - If no page value provided, result should default to page 1
//IN GET - Each page should show only 10 items at a time

//Swagger Documentation
/**
 * @openapi
 * /api/restaurants:
 *   get:
 *     description: Lists all restaurants in the database
 *     responses:
 *       200:
 *         description: Returns a list of restaurants
 */

router.get("/", async (req, res, next) => {
    let pageSize = parseInt(req.query.page) || 1; 
    let limitPage = 10; 
    let skipPage = (pageSize - 1) * limitPage; 

    try {
        let restaurants = await Restaurant
        .find()
        .skip(skipPage).
        limit(limitPage); 
        res.status(200).json(restaurants); 
    } catch (err) {
        console.log(err); 
        res.status(500).json({ ErrorMessage: "The Server threw an exception" }); 
    }
});


//Swagger Documentation
/**
 * @openapi
 * /api/restaurants:
 *   post:
 *     description: Adds a new restaurant to the database
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - address
 *               - phoneNumber
 *               - emailAddress
 *               - rating
 *             properties:
 *               name:
 *                 type: string
 *               address:
 *                 type: string
 *               phoneNumber:
 *                 type: number
 *               emailAddress:
 *                 type: string
 *               rating:
 *                 type: number
 *     responses:
 *       200:
 *         description: Restaurant created successfully
 */

//POST /api/restaurants  parameters : JSON object with restaurant information - Create a new restaurant record in the database with the information provided 
router.post("/", async (req, res, next) => {
    //validating the required fields
    if (!req.body.name) {
        res.status(400).json({ ValidationError: "Name is required" });
    }
    else if (!req.body.address) {
        res.status(400).json({ ValidationError: "Address is required" });
    }
    else if (!req.body.phoneNumber) {
        res.status(400).json({ ValidationError: "Phone Number is required" });
    }
    else if (!req.body.emailAddress) {
        res.status(400).json({ ValidationError: "Email Address is required" });
    }
    else if (!req.body.rating) {
        res.status(400).json({ ValidationError: "Rating is required" });
    }
    else {
        try {
            //Creating a new restaurant object in database
            let newRestaurant = await Restaurant.create({
                name: req.body.name,
                address: req.body.address,
                phoneNumber: req.body.phoneNumber,
                emailAddress: req.body.emailAddress,
                rating: req.body.rating
            });
            res.status(200).json(newRestaurant); 
        }
        catch (err) { 
            console.log(err); 
            res.status(500).json({ ErrorMessage: "The Server threw an exception" }); //sends back the error in json format
        }
    }
});

//Swagger Documentation
/**
 * @openapi
 * /api/restaurants/{id}:
 *   delete:
 *     description: Deletes a restaurant from the database
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the restaurant to delete
 *     responses:
 *       200:
 *         description: Restaurant deleted successfully
 */

//DELETE /api/restaurants/:id   parameters : ID value of the restaurant to delete - Delete the restaurant from the database
router.delete("/:id", async (req, res, next) => {
    try {
        await Restaurant.deleteOne({ _id: req.params._id });
        res.status(200).json({ success: "true" });
      } catch (err) {
        console.log(err);
        res.status(500).json({ ErrorMessage: "Server threw an exception" });
      }
});

module.exports = router;