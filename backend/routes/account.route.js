const express = require('express')
const { balance, transfer } = require('../controllers/account.controller')
const { userAuthMiddleware } = require('../middlewares/user.auth.middleware')
const router = express.Router()

router.get('/balance',userAuthMiddleware, balance)

router.post('/transfer', userAuthMiddleware, transfer)

module.exports = router