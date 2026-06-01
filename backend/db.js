const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/')
.then(()=>{
    console.log('Connected to the database successfully..')
})
.catch((err)=>{
    console.log('Something went wrong')
})