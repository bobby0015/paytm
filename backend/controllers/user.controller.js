const userModel = require('../models/user.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { userInputs } = require('../validation/user.validation')

const signup = async (req, res) => {
    const { firstName, lastName, email, password } = req.body

    const validInputs = userInputs({firstName,lastName,email,password})

    if(validInputs != true) {
        return res.status(400).json({
            msg : validInputs,
            success : false
        })
    }

    const user = await userModel.findOne({ email })

    try {
        if (user) {
            return res.status(409).json({
                msg: "User already exist",
                success: true
            })
        }

        bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS), function (err, salt) {
            bcrypt.hash(password, salt, async function (err, hashedPassword) {
                try {
                    if (!hashedPassword) {
                        throw new Error("Password hashing failed");
                    }

                    const newUser = await userModel.create({
                        firstName,
                        lastName,
                        email,
                        password: hashedPassword
                    })

                    const newUserToken = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET)

                    return res.status(200).json({
                        msg: 'User account created successfully !',
                        success: true,
                        user: { data : newUser, token: newUserToken }
                    })

                } catch (err) {
                    console.log(err)
                    return res.status(500).json({
                        msg: 'Something went wrong',
                        success: false
                    })
                }
            })
        })

    } catch (err) {
        return res.status(500).json({
            msg: 'Something went wrong',
            success: false
        })
    }

}

const signin = (req, res) => {

}

module.exports = {
    signin,
    signup
}