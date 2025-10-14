//will load environment variables from a .env file so that can use the connection string keys 
require ('dotenv').config(); 

//Configuration object 
const Configuration = {
    connectionString:{
        // MongoDB connection link -- which will be connected from .env 
        MongoDB: process.env.CONNECTION_STRING_MONGODB
    }

};

//export the configuration object
module.exports = Configuration;

