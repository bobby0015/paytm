const express = require("express");
const app = express()

//connection to the database 
require('./db')

app.listen(3000,()=>{
    console.log("Server is running on PORT : 3000")
})