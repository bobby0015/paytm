const express = require('express')
const { signin, signup } = require('../controllers/user.controller')
const router = express.Router()

router.post('/user/signup', signup)

router.post('/user/signin', signin)
    
router.put('/user:id',(req,res)=>{
    res.send('Hey there from put')
})

module.exports = router