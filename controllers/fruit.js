///////////////////////////
//IMPORT DEPENDANCIES
///////////////////////////
// express for router function
const express = require("express")
// fruit model
const Fruit = require("../models/fruit.js")

/////////////////////////////
// create router
////////////////////////////
const router = express.Router()



///////////////////////////////
// ROUTES
///////////////////////////////
///////////////////////////////////////
// ROUTES cut from server.js
////////////////////////////////////////

//////////////////////////////
// ROUTER MIDDLEWARE
//////////////////////////////
router.use((req, res, next) => {
    if(req.session.loggedIn){
        //send to routes
        next()
    }else {
        res.redirect("/user/login")
    }
})



/////////////////////////
// FRUITS ROUTE
//////////////////////////
// SEED ROUTE - seed our starter data
router.get("/seed", (req, res) => {
    // array of start fruits
    const startFruits = [
        { name: "Orange", color: "orange", readyToEat: false },
        { name: "Grape", color: "purple", readyToEat: false },
        { name: "Banana", color: "orange", readyToEat: false },
        { name: "Strawberry", color: "red", readyToEat: false },
        { name: "Coconut", color: "brown", readyToEat: false },
      ];
      // delete all fruits
    Fruit.deleteMany({})
    .then((data) => {
        // seed starter fruits
        Fruit.create(startFruits)
        .then((data) => {
            res.json(data)
        })
    })
})

//INDEX ROUTE - GET - /fruits
router.get("/", (req, res) => {
    // find all the fruits
    Fruit.find({username: req.session.username})
        .then((fruits) => {
            //render the index template with the fruits
            res.render("fruits/index.liquid", {fruits}) // same as {fruits: fruits}
        })
        // error handling
        .catch((error) => {
            res.json({error})
        })
})

///////////////////////////////////////
// NEW ROUTE - GET request - "/fruits/new -purpose is to generate a form to add new content
//////////////////////////////////////
router.get("/new", (req, res) => {
    res.render("fruits/new.liquid")
})

///////////////////////////////////
// Create route - post request - /fruits
///////////////////////////////////
router.post("/", (req, res) => {
    //convert the checkbox property to true or false
    req.body.readyToEat = req.body.readyToEat === "on" ? true : false

    //add the username to req.body to track user
    req.body.username = req.session.username

    // create the new fruit
    Fruit.create(req.body)
    .then((fruit) => {
        // redirect user back to index route
        res.redirect("/fruits")
    })
    // error handling
    .catch((error) => {
        res.json({error})
    })
})

////////////////////////////////
// EDIT ROUTE - get request - /fruits/:id/edit - generates a form
////////////////////////////////
router.get("/:id/edit", (req, res) => {
    //get the id from params
    const id = req.params.id
    //get the fruit with the matching id
    Fruit.findById(id)
    .then((fruit) => {
        //render the edit page template with the fruit data
        res.render("fruits/edit.liquid", {fruit})
    })
    // error handling
    .catch((error) => {
        res.json({error})
    })
})

//////////////////////////////////////
// UPDATE ROUTE - PUT request - /fruits/:id
/////////////////////////////////////
router.put("/:id", (req, res) => {
    //get the id from params
    const id = req.params.id
    //conver checkbox property to true or false
    req.body.readyToEat = req.body.readyToEat === "on" ? true : false
    // update the item with matching id
    Fruit.findByIdAndUpdate(id, req.body, {new: true})
    .then((fruit) => {
        // redirect user back to index
        res.redirect("/fruits")
    })
    // error handling
    .catch((error) => {
        res.json({error})
    })
})

/////////////////////////////
// DESTROY ROUTE - delete request - /fruits/:id
/////////////////////////////
router.delete("/:id", (req, res) => {
    //grab the id from params
    const id = req.params.id
    // delete the fruit
    Fruit.findByIdAndRemove(id)
    .then((fruit) => {
        //redirect user back to index
        res.redirect("/fruits")
    })
    // error handling
    .catch((error) => {
        res.json({error})
    })
})



// SHOW ROUTE - get - /fruits/:id
router.get("/:id", (req, res) => {
    //get the id from params
    const id = req.params.id

    // get that particular fruit from the database
    Fruit.findById(id)
    .then((fruit) => {
        // render the show page with said fruit
        res.render("fruits/show.liquid", {fruit})
    })
    // error handling
    .catch((error) => {
        res.json({error})
    })
})


///////////////////////////////
// EXPORT THE ROUTER
///////////////////////////////
module.exports = router