require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session)
const cors = require('cors')

const app = express()
const port = process.env.PORT || 3005

// MIDDLEWARES
app.use(cors({credentials: true, origin: true}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const loginRoutes = require('./routes/loginRoutes')
const studentRoutes = require('./routes/studentRoutes')

mongoose.connect(process.env.DATABASE_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("Connection to MongoDB successful...")).catch((err) => console.log("Unable to connect to MongoDB...", err));

const mongoDBstore = new MongoDBStore({
    uri: process.env.DATABASE_CONNECTION_STRING,
    collection: 'localSessions',
})

// SESSIONS HANDLER
const MAX_AGE = 1000 * 60 * 60 * 3 // 3hrs
app.use(
    session({
        secret: 'DUB_NATION',
        name: 'session-id', // cookies name to be put in "key" field in postman
        store: mongoDBstore,
        cookie: {
            maxAge: MAX_AGE, // this is when our cookies will expired and the session will not be valid anymore (user will be log out)
            secure: false, // to turn on just in production
        },
        resave: false,
        saveUninitialized: false,
    })
)


// ROUTERS
app.use('/api', loginRoutes)
app.use('/queries', studentRoutes)

// START SERVER
app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})

module.exports = app