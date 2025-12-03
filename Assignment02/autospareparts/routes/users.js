var express = require('express');
var router = express.Router();

//ADDED: import users models
const User = require('../models/user');

//required attributes 
// name: { type: String, required: true },
// email: { type: String, required: true, unique: true },
// role: { type: String, required: true, enum: ["Owner", "Manager", "Employee"] }

//ADDED - Swagger for GET /users

/**
 * @openapi
 * /users:
 *   get:
 *     description: Lists all registered users
 *     responses:
 *       200:
 *         description: Returns all users
 */

// GET /users - parameters: None 
router.get("/", async (req, res) => {
  //List all users in the database
  try {
    const users = await User.find();
    //sending back as JSON
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ ErrorMessage: "Server threw an exception" });
  }
});

//ADDED - Swagger for DELETE /users/:_id

/**
 * @openapi
 * /users/{id}:
 *   delete:
 *     description: Deletes a user using their ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: User deleted successfully
 */

// DELETE /users/:_id - parameters: Id: user ID to be deleted 
router.delete("/:_id", async (req, res) => {
  try{
    const userId = req.params._id;
    const deletedUser = await User.findByIdAndDelete(userId);
    if (deletedUser) {
      res.status(200).json({ Message: `User with ID ${userId} deleted successfully.` });
    } else {
      res.status(404).json({ ErrorMessage: `User with ID ${userId} not found.` });
    }
  }catch (error) {
    res.status(500).json({ ErrorMessage: "Server threw an exception" });
  }
});

module.exports = router;
