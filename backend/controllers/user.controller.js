const userModel = require('../models/user.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { userInputs } = require('../validation/user.validation')

const signup = async (req, res) => {
    const { firstName, lastName, email, password } = req.body

    const validInputs = userInputs({ firstName, lastName, email, password })

    if (validInputs != true) {
        return res.status(400).json({
            msg: validInputs,
            success: false
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

                    const newUserToken = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET || 'secretkey')

                    return res.status(200).json({
                        msg: 'User account created successfully !',
                        success: true,
                        user: { data: newUser, token: newUserToken }
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

const signin = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await userModel.findOne({ email })

        if (!user) {
            return res.status(404).json({
                msg: 'User not found',
                success: false
            })
        }

        bcrypt.compare(password, user.password, function (err, result) {
            if (!result) {
                return res.status(409).json({
                    msg: "Enter the correct password",
                    success: false
                })
            }

            try {
                const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || 'secretkey')

                return res.status(200).json({
                    msg: 'User logged in successfully',
                    success: true,
                    token
                })

            } catch (err) {
                res.status(500).json({
                    msg: 'Something went wrong',
                    success: false
                })
            }
        })

    } catch (err) {
        res.status(500).json({
            msg: 'Something went wrong',
            success: false
        })
    }
}

const updateUser = async (req, res) => {
    const { firstName, lastName, password } = req.body

    try {
        const user = await userModel.findOne({ _id: req.userId })

        if (!user) {
            return res.status(404).json({
                msg: 'User not found',
                success: false
            })
        }

        //Intializing the empty object
        const updateFields = {}

        if (firstName) updateFields.firstName = firstName
        if (lastName) updateFields.lastName = lastName

        if (password) {
            const saltRounds = parseInt(process.env.SALT_ROUNDS)
            const salt = bcrypt.genSalt(saltRounds)
            updateFields.password = bcrypt.hash(password, salt)
        }

        if (Object.keys(updateFields).length === 0) {
            return res.status(400).json({
                msg: 'No feilds to update',
                success: false
            })
        }

        // updating the user
        const updatedUser = await userModel.findByIdAndUpdate(
            req.userId,
            { $set: updateFields },
            { new: true, runValidators: true }
        ).select("-password");

        return res.status(200).json({
            msg: 'User updated successfully',
            success: true,
            user: updatedUser
        });


    } catch (err) {
        console.error("Update User Error:", err);
        return res.status(500).json({
            msg: 'Something went wrong',
            success: false
        })
    }

}

const findUser = async (req, res) => {
    const filter = req.query.filter || "";
    console.log(filter)
    const users = await userModel.find({
        $or: [
            {
                firstName: {
                    "$regex": filter
                }
            },
            {
                lastName: {
                    "$regex": filter
                }
            }
        ]
    })
    console.log(users)
    res.status(200).json({
        Users : users.map((user)=>({
            email: user.email,
            firsname: user.firstName,
            lastname: user.lastName,
            id: user._id
        }))
    })
}

module.exports = {
    signin,
    signup,
    updateUser,
    findUser
}