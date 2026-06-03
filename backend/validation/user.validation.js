const { z } = require('zod')

const user = z.object({
    firstName: z.string().min(3, { message: 'The first name should contain atleast 3 letters' }),
    lastName: z.string().min(3, { message: 'The last name should contain atleast 3 letters' }),
    email: z.string().email({ message: 'The email should be a valid email' }),
    password: z.string()
        .min(6, { message: 'The password should contain atleast 6 letters.' })
        .max(24, { message: 'The password can only have have 24 letters.' })
        .regex(/[A-Z]/, { message: 'The password should contain atleast one capital letter' })
        .regex(/[^a-zA-Z0-9]/, { message: 'The password should contain atleast one special character' })
})

function userInputs(userInputs) {
    const result = user.safeParse(userInputs)

    if(!result.success) {
        return msg = result.error.errors[0].message;
    }

    return result.success
}

module.exports = {
    userInputs
}