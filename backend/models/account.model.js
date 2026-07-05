const mongoose = require('mongoose')

const Account = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        require: true
    },
    balance: {
        type: Number,
        require: true
    }
})

module.exports = mongoose.model('accounts', Account)