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
  res.render('register', { title: 'Create an account to Access the API' }); //render the register view
});

// POST /register
router.post('/register', async (req, res, next) => {
  // search if user is already registered first 
  let existingUser = await User.find({username: req.body.username});
  if (existingUser && existingUser.length > 0){
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
