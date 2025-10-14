//Remember taught: Naming conventions - models singular & routers plural

//Import mongoose
let mongoose = require('mongoose');
    //properties to be kept in the contact model
    // Middle Name
    // Last Name (required)
    // Email Address (required)
    // Phone Number
    // Address Line 1
    // Address Line 2
    // Province
    // Postcode
    // Country
const contactSchemaObject = {
    middleName: {type: String},
    lastName: {type: String, required: true},
    emailAddress: {type: String, required: true},
    phoneNumber: {type: String},
    addressLine1: {type: String},
    addressLine2: {type: String},
    province: {type: String},
    postcode: {type: String},
    country: {type: String} 

};
//mongoose schema object
let contactMongooseSchema = new mongoose.Schema(contactSchemaObject);

module.exports = mongoose.model('Contact', contactMongooseSchema); //contacts export in MongoDB