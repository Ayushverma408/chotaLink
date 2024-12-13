const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const { error } = require('console')
const cors = require('cors');
dotenv.config()

const app = express()
const port = process.env.PORT || 8080

app.use(express.json())

app.use(cors({ origin: 'http://localhost:3000' })); // Allow requests from your frontend

app.get('/', (req, res) => { res.send("request recieved lessgoo!") })

const urlRoutes = require('./routes/urlroutes.js')
app.use('/', urlRoutes)

const authRoutes = require('./routes/authroutes.js')
app.use('/', authRoutes)


const { redirectkarochotaurl } = require('./controllers/urlcontrollers.js');
app.get('/:chotaurl', redirectkarochotaurl);


app.listen(port, () => {
    mongoose.connect(process.env.MONGO_URI).then((() => console.log('connected with mongodb'))).catch((err) => console.error('Failed to connect', err))
    console.log(`we running: ${port}`)
})