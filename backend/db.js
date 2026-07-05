const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log('Connected to the database successfully..')
})
.catch((err)=>{
    console.log('Something went wrong')
})