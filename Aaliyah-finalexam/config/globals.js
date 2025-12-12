require ('dotenv').config();
const configurations = {
    connectionStrings:{
        //CONNECTION_STRING_MONGODB=mongodb+srv://examadmin:MySecretPassword@cluster0.7yu7ckk.mongodb.net/COMP3033
        MongoDB:process.env.CONNECTION_STRING_MONGODB // Connection string for MongoDB from .env files 

    }
};

module.exports = configurations;