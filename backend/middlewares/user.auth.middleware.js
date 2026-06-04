const jwt = require('jsonwebtoken')

function userAuthMiddleware(req, res, next) {
    const authHeader = req.header('Authorization')

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            msg: 'User token not found',
            success: false
        })
    }

    const token = authHeader.split(' ')[1]

    try {
        const data = jwt.verify(token, process.env.JWT_SECRET || 'secretkey')
        req.user = data
        next()
    } catch (err) {
        return res.status(500).json({
            msg: 'Something went wrong',
            success: false
        })
    }
}

module.exports = { userAuthMiddleware }