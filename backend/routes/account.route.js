const express = require('express')
const { balance } = require('../controllers/account.controller')
const { userAuthMiddleware } = require('../middlewares/user.auth.middleware')
const router = express.Router()

router.get('/balance',userAuthMiddleware, balance)

module.exports = router