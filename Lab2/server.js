
//STEP 1: Import Link connect and url packages
const connect = require('connect');
const url = require('url');

//STEP 2: Create connect app object 
const app = connect();

//STEP 3: Middleware functions
function Lab2Handler(req, res, next) {

    //STEP 4: setting up the content type for json
    //my own notes: other than text/plain 
    res.setHeader('Content-Type', 'application/json'); //this basically initiate the browser to read the respond as json format

    //STEP 5: parsing the url to get the parameters 
    const CalApi = url.parse(req.url, true); //true means parse the query string too

    //STEP 6: parses the url for 3 parameters: method, x, and y
    let method = CalApi.query.method;
    let x = +CalApi.query.x; //the + sign is to convert string to number
    let y = +CalApi.query.y; //the + sign is to convert string to number

    //STEP 7: perform the operation based on the method parameter -- used switch case
    // Possible values for the method parameter are: "add", "subtract", "multiply", and "divide"
    // STEP 7.1: If the method value is anything else, show an error message
    switch (method) {
        case "add":
            result = x + y;
            break;
        case "subtract":
            result = x - y;
            break;
        case "multiply":
            result = x * y;
            break;
        case "divide":
            result = x / y;
            break;
        default:
            res.end("Error: Invalid method. ONLY use add, subtract, multiply, or divide.");
            return; // Exit the function
    }
    
    //STEP 8: Return the full math operation as a JSON object in this format
    let CalResponseApi = {
        x: x,
        y: y,
        operation: method,
        result: result
    };

    //STEP 9: The respond.
    //since it's was a number have to make it into a string and respond
    res.end(JSON.stringify(CalResponseApi));
}


//STEP 10: 
//GET/lab2
app.use('/lab2', Lab2Handler);

// STEP 11: server on a port
app.listen(3000);
console.log('Server running at http://localhost:3000');