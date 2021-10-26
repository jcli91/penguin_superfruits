//////////////////////////
// IMPORT OUR DEPENDANCIES
/////////////////////////
//loads .env variables
require("dotenv").config()
// loads mongoose database library
const mongoose = require("mongoose")

//////////////////////////////////
//ESTABLISH DATABASE CONNECTION
//////////////////////////////////
// setup the inputs for mongoose connect
const DATABASE_URL = process.env.DATABASE_URL // url from .env
const CONFIG = {  // CONFIG will stop deprecation warnings
    useNewUrlParser: true,
    useUnifiedTopology: true
}

// Connect to Mongo  //  CONFIG will stop deprecation warnings
mongoose.connect(DATABASE_URL, CONFIG)

//our connection messages
mongoose.connection
.on("open", () => console.log("Connected to Mongo"))
.on("close", () => console.log("disconnected from mongo"))
.on("error", (error) => console.log(error))

/////////////////////////////
// EXPORT THE CONNECTION
////////////////////////////
module.exports = mongoose