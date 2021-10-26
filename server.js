/////////////////////////////////
// IMPORT DEPENDANCIES
////////////////////////////////

require("dotenv").config() // brings in .env vars
const express = require("express") // web framework
const morgan = require("morgan") // logger
const methodOverride = require("method-override") // to swap request methods

const path = require("path") // helper functions for file paths
const FruitsRouter = require("./controllers/fruit")
const UserRouter = require("./controllers/user")
const session = require("express-session")// session middleware
const MongoStore = require("connect-mongo")// save sessions in mongodb






/////////////////////////////////
// CREATE OUR APP WITH OBJECT, CONFIGURE LIQUID
/////////////////////////////////
// import liquid
const liquid = require("liquid-express-views")
// construct an absolute path to our views folder
const viewsFolder = path.resolve(__dirname, "views/")
// log to see the value of the viewsFolder
// console.log(viewsFolder)

// create an app object with liquid, passing the path to the viewsFolder
const app = liquid(express(), {root: viewsFolder})
//console. log app to confirm it exists
// console.log(app)

///////////////////////////////////////
// REGISTER OUR MIDDLEWARE
///////////////////////////////////////
// logging
app.use(morgan("tiny"))
// ability to override request methods
app.use(methodOverride("_method"))
// ability to parse urlencoded from for submission
app.use(express.urlencoded({extended: true}))
// setup our public folder to serve files statically
app.use(express.static("public"))
// middleware to create sessions (req.session)
app.use(session({
    secret: process.env.SECRET,
    store: MongoStore.create({mongoUrl: process.env.DATABASE_URL}),
    resave: false
    
}))


// ROUTES
app.get("/", (req, res) => {
    res.render("index.liquid")
})
// REGISTER FRUITS ROUTER
app.use("/fruits", FruitsRouter)

// REGISTER USER ROUTER
app.use("/user", UserRouter)

////////////////////////////////////////
// SETUP SERVER LISTENER
///////////////////////////////////////
const PORT = process.env.PORT // grabbing the port number from env
app.listen(PORT, () => console.log(`Listening on port ${PORT}`))