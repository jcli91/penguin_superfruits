//////////////////////////////
// Import Dependencies
//////////////////////////////
const express = require("express")
const User = require("../models/user")
const bcrypt = require("bcryptjs")

//////////////////////////////
// Create Router
//////////////////////////////
const router = express.Router()




//////////////////////////////
// ROUTES
//////////////////////////////

// the sign up routes (Get => Form, Post => form submit/submission)
// url will be "/user/signup"
router.get("/signup", (req, res) => {
    res.render("user/signup.liquid")
})

router.post("/signup", async (req, res) => {
    // longer way 
    //const salt = await bcrypt.genSalt(10)
    //req.body.password = await bcrypt.hash(req.body.password, salt)

    // encrypt the password (hide) // shorter way
    req.body.password = await bcrypt.hash(req.body.password,
        await bcrypt.genSalt(10))

    // save the user to our database
    User.create(req.body)
        .then((user) => {
            //log the user as a test
            console.log(user)
            // redirect user to login
            res.redirect("/user/login")
        })
        // error handling
        .catch((error) => {
            res.json({ error })
        })
})
// The login Routes (Get => Form, Post => form submit)
// "/user/login"
router.get("/login", (req, res) => {
    res.render("user/login.liquid")
})

router.post("/login", async (req, res) => {
    // destructure username and password from req.body
    const { username, password } = req.body
    //    const username= req.body.username
    //    const password = req.body.password //same as above
      // search for the user
  User.findOne({ username })
  .then(async (user) => {
    // check if the user exists
    if (user) {
      // compare passwords
      const result = await bcrypt.compare(password, user.password);
      if (result) {
          //STORE SOME DATA IN THE SESSION OBJECT
          req.session.username = username
          req.session.loggedIn = true
        // redirect to fruits index page
        res.redirect("/fruits");
      } else {
        // send error of wrong password
        res.json({ error: "password doesn't match" });
      }
    } else {
      //send error that user doesn't exist
      res.json({ error: "user doesn't exist" });
    }
  })
  // error handling
  .catch((error) => {
    res.json({ error });
  });
});

// Logout - GET request to /user/logout
router.get("/logout", (req,res) => {
    //destroy the session
    req.session.destroy((err) => {
        // send user back to main page
        res.redirect("/")
    })
})


///////////////////////////////
// EXPORT THE ROUTER
///////////////////////////////

module.exports = router