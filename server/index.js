const express = require('express')
const path = require('path')
const session = require('express-session')
require('dotenv').config({ path: __dirname + '/../.env'})

// server
const { 
    SESSION_SECRET,
    SERVER_PORT 
} = process.env

const app = express();

app.use(express.json());

app.use(
    session({
        resave: false,
        saveUninitialized: true,
        secret: SESSION_SECRET,
        cookie: { maxAge: 1000 * 60 * 5 },
    }),
    )
    
app.use( express.static( __dirname + '/../build'));
app.get('*', (req,res) => {
    res.send(path.join(__dirname, '../build/index.html'))
})

app.listen(SERVER_PORT, () => console.log(`server ready on ${SERVER_PORT}`))