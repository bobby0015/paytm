const express = require('express')
const { signin, signup } = require('../controllers/user.controller')
const { userAuthMiddleware } = require('../middlewares/user.auth.middleware')
const router = express.Router()

router.post('/user/signup', signup)

router.post('/user/signin', signin)
    
router.get('/user',userAuthMiddleware,(req,res)=>{
    res.send(req.user)
})

module.exports = router