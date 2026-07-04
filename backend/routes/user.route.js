const express = require('express')
const { signin, signup, updateUser, findUser } = require('../controllers/user.controller')
const { userAuthMiddleware } = require('../middlewares/user.auth.middleware')
const router = express.Router()

router.post('/user/signup', signup)

router.post('/user/signin', signin)
    
router.put('/user',userAuthMiddleware, updateUser)

router.get('/user/bulk',userAuthMiddleware, findUser)

module.exports = router