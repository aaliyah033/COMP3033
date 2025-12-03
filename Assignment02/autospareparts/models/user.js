//models/user.js 
const mongoose = require('mongoose');
const plm = require('passport-local-mongoose'); 

//data schema object in JSON for user attributes
// Name (required)
// Email (required)
// Password (required)
// Role (required) - Owner, Store Manager, Employee

const UserSchemaObject = {
    username:{type: String, required: true}, 
    email: {type: String, required: true},
    name: {type: String, required: true},
    role: {type: String, required: true, enum: ['Owner', 'Store Manager', 'Employee']}
};

//mongoose schema 
let UserSchema = new mongoose.Schema(UserSchemaObject);

//plugin to add passport local mongoose functionality to UserSchema - inject plm function to handle the Auth
UserSchema.plugin(plm); 

//export the mongoose model
module.exports = mongoose.model('User', UserSchema);
