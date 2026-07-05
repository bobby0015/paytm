const account = require('../models/account.model')

const balance = async (req, res) => {

    try {
        const user = await account.findOne({ userId: req.userId })

        res.status(200).json({
            msg: 'User balance fetched successfully',
            success: true,
            balance: user.balance
        })
    } catch (err) {
        res.status(500).json({
            msg: 'Internal server error',
            success: false,
            err: err.message
        })
    }
}

module.exports = {
    balance
}