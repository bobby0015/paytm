const express = require("express");
const app = express()
const User = require('./routes/user.route')
const cors = require('cors')
const bodyParser = require('body-parser')

//config the .env file 
require('dotenv').config()

//connection to the database 
require('./db')

//middlewares
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded())

app.use('/api/v1',User)

const PORT = process.env.PORT

app.listen(PORT,()=>{
    console.log("Server is running on PORT : " + PORT)
})