////////////////////////////
//IMPORT DEPENDANCIES
///////////////////////////
// IMPORT EXISTING CONNECTED MONGOOSE OBJECT FROM CONNECTION.JS
const mongoose = require("./connection") // does not require .js after ./connection

////////////////////////////////////
// CREATE OUR FRUITS MODEL
////////////////////////////////////
//destructuring Schema and model from mongoose
// const Schema = mongoose.Schema
//const model = mongoose.Model
const {Schema, model} = mongoose // destructured version of above variables

//make a fruits schema // new = constructor
const fruitSchema = new Schema({
    name: String,
    color: String,
    readyToEat: Boolean,
    username: String
})

// make the fruit model - this allows you to use restful routes/ get /find
//models should be uppercase
const Fruit = model("Fruit", fruitSchema)

// log the model to make sure it works // always practice console logging
// console.log(Fruit)

////////////////////////////
//export the fruit model
////////////////////////////
module.exports = Fruit