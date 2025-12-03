//routes/index.js
var express = require('express');
var router = express.Router();

//ADDED: import users models
const User = require('../models/user');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Welcome! Auto Spare Parts API' });
});

// GET /register 
router.get('/register', function(req, res, next) {
  //checks if registration was successful or not
  let successMessage = null;
  let ifError = false;
  if (req.query.success === 'true') {
    successMessage = 'Registration successful.';
  } else if (req.query.success === 'false') {
    successMessage = 'Registration failed. Please try again.';
    ifError = true;
  }
  res.render('register', {  //render the register view
     title: 'Create an account to Access the API',
      successMessage: successMessage, //this will show the message on the register page
      ifError: ifError //this will indicate if there was an error
    });
});

// POST /register
router.post('/register', async (req, res, next) => {
  console.log(" POST / register called"); //log to console when register is called
  console.log("body",req.body); //log the request body to see the data sent
  
  //checks for password match
  if (req.body.password !== req.body.confirm) {
    return  res.redirect('/register?success=false'); //redirect to register page if passwords do not match
  }

  // search if user is already registered first 
  let existingUser = await User.find({
    $or: [
    {username: req.body.username}, //if matches fails 
    {email: req.body.email} //if matches fails 
    ]
  });

  if (existingUser && existingUser.length > 0){
    //console.log("User already exists:", existingUser);
    res.redirect('/register?success=false'); //redirect to register page if user exists
  } 
  else{
    //if not registered create a new user
    let newUser = new User({
      username: req.body.username,
      email: req.body.email,
      name: req.body.name,
      role: req.body.role
    });

    console.log("Registering new user:");

    User.register(newUser, req.body.password,(err, user) => {
      if (err) { //checking for errors during the registration
        console.log("Error during user registration:", err); //need to check the log for the error 
        return res.redirect('/register?success=false'); //registration failed
      }
      res.redirect('/register?success=true'); //registration success 
    });
  }
});


module.exports = router;
