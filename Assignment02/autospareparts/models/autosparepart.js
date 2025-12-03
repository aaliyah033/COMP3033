//models/autosparepart.js

const mongoose = require('mongoose');

//data schema object for the spare parts attributes
//Name (required)
// Spare Number (required)
// Quantity (required)
// Color
// Price (required)
// Position (left/right)
// Supply country

const autosparepartSchemaObject = {
    name: { type: String, required: true },
    spareNumber: { type: String, required: true },
    quantity: { type: Number, required: true },
    color: { type: String },
    price: { type: Number, required: true },
    position: { type: String, enum: ['left', 'right'] },
    supplyCountry: { type: String }
};

//mongoose schema
const mongooseSchema = new mongoose.Schema(autosparepartSchemaObject);

//export the mongoose model
module.exports = mongoose.model('AutoSparePart', mongooseSchema);