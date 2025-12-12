const mongoose = require('mongoose');

//Data schema object for the restaurant attributes
// name
// address
// phoneNumber
// emailAddress
// rating (a number from 1 to 10)

//Description: Represents a restaurant location in our directory

const restaurantSchemaObject = {
    name: { type: String, required: true },
    address: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    emailAddress: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 10 }
};

const mongooseSchema = new mongoose.Schema(restaurantSchemaObject);

module.exports = mongoose.model('Restaurant', mongooseSchema);