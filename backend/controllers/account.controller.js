const mongoose = require('mongoose')
const Account = require('../models/account.model')

const balance = async (req, res) => {

    try {
        const user = await Account.findOne({ userId: req.userId })

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

const transfer = async (req, res) => {
    const session = await mongoose.startSession()

    session.startTransaction()
    const { amount, sender } = req.body

    //Fetch the accounts within the transactions 
    const account = await Account.findOne({ userId: req.userId }).session(session)

    if (!account || account.balance < amount) {
        await session.abortTransaction()
        return res.status(409).json({
            msg: 'Insufficient Balance',
            success: false,
        })
    }

    const senderAccount = await Account.findOne({userId: sender}).session(session)

    if(!senderAccount){
        await session.abortTransaction()
        return res.status(404).json({
            msg: 'Sender not found',
            success: false,
        })
    }

    // Perform the transaction
    await Account.updateOne({userId: req.userId}, { $inc : {balance : -amount}}).session(session)
    await Account.updateOne({userId: sender}, {$inc : {balance : amount}}).session(session)

    //Commit the tranasaction
    await session.commitTransaction()
    
    res.status(200).json({
        msg : 'Payment successfull',
        success : true,
    })
}

module.exports = {
    balance,
    transfer
}