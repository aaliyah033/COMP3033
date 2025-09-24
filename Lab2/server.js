//Example: from week2 --- connect-server.js

//STEP 1: Import Link connect and url packages
const connect = require('connect');
const url = require('url');

//STEP 2: Create connect app object 
const app = connect();

//STEP 3: Middleware functions
function Lab2Handler(req, res, next) {}


//STEP : 
//GET/lab2
app.use('/lab2', Lab2Handler);


// STEP : server on a port
app.listen(3000);
console.log('Server running at http://localhost:3000');