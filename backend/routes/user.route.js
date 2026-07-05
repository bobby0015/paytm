const express = require('express')
const { signin, signup, updateUser, findUser } = require('../controllers/user.controller')
const { userAuthMiddleware } = require('../middlewares/user.auth.middleware')
const router = express.Router()

router.post('/signup', signup)

router.post('/signin', signin)
    
router.put('/update',userAuthMiddleware, updateUser)

router.get('/bulk',userAuthMiddleware, findUser)

module.exports = router