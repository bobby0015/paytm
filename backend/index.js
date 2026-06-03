const express = require("express");
const app = express()
const User = require('./routes/user.route')

//connection to the database 
require('./db')

app.use('/api/v1',User)

app.listen(3000,()=>{
    console.log("Server is running on PORT : 3000")
})