// config/globals.js
require ('dotenv').config();
//Global configurations object 
const configurations = {
    connectionStrings:{
        MongoDB:process.env.CONNECTION_STRING_MONGODB // Connection string for MongoDB from .env files
    }
};

//Export the configurations object for use in other modules 
module.exports = configurations;