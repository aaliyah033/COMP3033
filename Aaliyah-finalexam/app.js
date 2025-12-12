var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors");


//added for the mongoose and configs
var configs = require('./config/globals');
var mongoose = require('mongoose');

//YAML  and swagger-jsdoc modules
const swaggerUI = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerJSDoc = require("swagger-jsdoc");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

//for restaurants API router
var restaurantsRouter = require('./routes/api/restaurants');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(cors()); //cors enable for all routes
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//swagger 
const swaggerJSDocOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Final exam Practical Restaurant API",
      version: "1.0.0",
      description: "This API allows users to perform CRUD operations on a collection of restaurants.",
      contact: {
        name: "Aaliyah Ally",
        email: "200480504@student.georgianc.on.ca",
        url: "https://github.com/aaliyah033/COMP3033/tree/main/Aaliyah-finalexam"
      }
    },
    servers: [
      { url: "http://localhost:3000"},
      { url: "http://localhost:3000/api" }, //because we are using /api for the API routes 
    ]
  },
  apis: [
    "./routes/api/*.js", 
    "./routes/*.js" 
  ]
};
const swaggerJSDocSpec = swaggerJSDoc(swaggerJSDocOptions);
app.use("/docs/dynamic", swaggerUI.serve, swaggerUI.setup(swaggerJSDocSpec));

//http://localhost:3000/docs/local/
//http://localhost:3000/docs/dynamic/

//YAML 
const swaggerDoc = YAML.load("./docs/api-specification.yaml");
app.use("/docs/local", swaggerUI.serve, swaggerUI.setup(swaggerDoc));

//for mongoose connection
mongoose
  .connect(configs.connectionStrings.MongoDB)
  .then(() => console.log("Connected successfully to MongoDB"))
  .catch((error) => console.error("Error connecting to MongoDB:", error));

app.use('/', indexRouter);
app.use('/users', usersRouter);

//for restaurants API route
app.use('/api/restaurants', restaurantsRouter);

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
