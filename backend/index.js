const express = require("express");
const app = express()
const User = require('./routes/user.route')
const cors = require('cors')
const bodyParser = require('body-parser')

//connection to the database 
require('./db')

//middlewares
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded())

app.use('/api/v1',User)

app.listen(3000,()=>{
    console.log("Server is running on PORT : 3000")
})