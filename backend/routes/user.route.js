const express = require('express')
const router = express.Router()

router.post('/user/signup', (req,res)=>{
    res.send("Hey there from signup")
})

router.post('/user/signin', (req,res)=>{
    res.send("Hey there from signin")
})
    
router.put('/user:id',(req,res)=>{
    res.send('Hey there from put')
})

module.exports = router