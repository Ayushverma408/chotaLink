const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config()

const app = express()

const port = process.env.port || 6000

app.get('/', (req, res) => {res.send("request recieved lessgoo!")})

// app.use()

app.listen(port, ()=> {console.log("we running")})