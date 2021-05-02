// "bcrypt": "^5.0.1",
// "connect-mongo": "^3.2.0",
// "dotenv": "^8.2.0",
// "ejs": "^3.1.6",
// "express": "^4.17.1",
// "express-flash": "^0.0.2",
// "express-session": "^1.17.1",
// "method-override": "^3.0.0",
// "mongodb": "^3.6.5",
// "mongoose": "^5.12.3",
// "morgan": "^1.10.0",
// "multer": "^1.4.2",
// "nodemon": "^2.0.7",
// "passport": "^0.4.1",
// "passport-local": "^1.0.0",
// "validator": "^13.6.0"
    
// get all the goodies from express
const express = require('express')
const app = express()
// express flash allows flash messages
const flash = require('express-flash')
// get passport for authentication
const passport = require('passport')
// Create a session middleware
const session = require('express-session')
// get database connection
const connectDB = require('./config/database')
// how we'll use our connection. MongoDB object modeling tool 
const mongoose = require('mongoose')
// MongoDB session store for Connect and Express written in Typescript
const MongoStore = require('connect-mongo')(session)
// HTTP request logger middleware for node.js
const logger = require('morgan')
// Lets you use HTTP verbs such as PUT or DELETE in places where the client doesn't support it.
const methodOverride = require('method-override')
// paths to different routes we'll use
const homeRoutes = require('./routes/home')
// const authRoutes = require('./routes/auth')
const entriesRoutes = require('./routes/entries')

// replit doesnt use .env. 
// need .env file in config folder offReplit

// require("dotenv").config({ path: "./config/.env" });

// get passport config
require('./config/passport')(passport)

// connect to the database
connectDB()

// use ejs in views to render html
app.set('view engine', 'ejs')

// static folder with secondary files we can serve
app.use(express.static('public'))

// body parsing.
// Makes express encode any url it sends out
app.use(express.urlencoded({ extended: true }))
// Parses incoming data as JSON 
app.use(express.json())

// enable forms with put & delete
app.use(methodOverride('_method'))

// enable logging
app.use(logger('dev'))

// sessions connected to mongo
app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection})
  })
)

// use passport middleware
// init password authentication
app.use(passport.initialize());
// persistent login sessions
app.use(passport.session());

// use express flash
app.use(flash())

app.use('/', homeRoutes)

// app.use('/auth', authRoutes)

app.use('/entries', entriesRoutes)

app.listen(process.env.PORT, () => {
  console.log(`Server is running lets go`)
})


// passport Passport is Express-compatible authentication middleware for Node.js.

// Passport's sole purpose is to authenticate requests, which it does through an extensible set of plugins known as strategies. Passport does not mount routes or assume any particular database schema, which maximizes flexibility and allows application-level decisions to be made by the developer. The API is simple: you provide Passport a request to authenticate, and Passport provides hooks for controlling what occurs when authentication succeeds or fails.

// multer ulter is a node.js middleware for handling multipart/form-data, which is primarily used for uploading files. It is written on top of busboy for maximum efficiency. NOTE: Multer will not process any form which is not multipart (multipart/form-data).