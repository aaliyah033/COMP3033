var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

//ADDED - for routes /api/spareparts.js
var sparepartsAPIRouter = require('./routes/api/spareparts');

//ADDED - for API routes
//import global configuration and mongoose 
var configs = require('./config/globals');
var mongoose = require('mongoose');

//ADDED - for AUTH with Passport
var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//ADDED - Authentication configure Passport and Basic Strategy
app.use(passport.initialize());
passport.use(
  new BasicStrategy(async (username, password, done) => {
    const User = require('./models/user');
    let existingUser = await User.find({username:username});
    if (existingUser && existingUser.length > 0){
      let AuthenticatedUser = await existingUser[0].authenticate(password);
      //user found, now verify password
      let isPasswordValid = AuthenticatedUser.user.username === username;
      if (isPasswordValid){
        console.log("Authentication successful for user",existingUser[0].username);
        return done(null, existingUser[0]); //authentication successful
      } else {
        return done(null, false); //invalid password
      }
    } else {
      return done(null, false); //user not found
    }
  })
);


app.use('/', indexRouter);
app.use('/users', 
  //ADDED - protect the users route with Basic Authentication
  passport.authenticate('basic', { session: false }),
usersRouter);

//ADDED - for the routes/api/spareparts.js
app.use('/api/spareparts',
  //ADDED - protect the users route with Basic Authentication
  passport.authenticate('basic', { session: false }),
  sparepartsAPIRouter);

//ADDED - connect to MongoDB using mongoose and the connection string from globals.js
//connect to MongoDB
mongoose
  .connect(configs.connectionStrings.MongoDB)
  .then(() => console.log("Connected successfully to MongoDB"))
  .catch((error) => console.error("Error connecting to MongoDB:", error));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
