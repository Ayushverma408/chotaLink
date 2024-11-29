const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const { error } = require('console')
const cors = require('cors');
dotenv.config()

const app = express()
const port = process.env.port || 6000

app.use(express.json())

// Allow requests from the frontend's origin
app.use(cors({
    origin: 'http://127.0.0.1:5500',
    methods: ['GET', 'POST'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'] // Allowed headers
}));

app.get('/', (req, res) => { res.send("request recieved lessgoo!") })

const Routes = require('./routes/urlroutes.js')
app.use('/api/', Routes)

app.listen(port, () => {
    mongoose.connect(process.env.MONGO_URI).then((() => console.log('connected with mongodb'))).catch((err) => console.error('Failed to connect', err))
    console.log("we running")
})