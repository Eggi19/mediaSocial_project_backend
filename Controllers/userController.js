const db = require('../models')
const User = db.User
const bcrypt = require('bcrypt')

module.exports = {
    registerUser: async (req, res) => {
        try {
            const { firstName, lastName, email, username, password, passwordConfirm } = req.body
            const passwordValidation = password === passwordConfirm ? true : false
            const findEmail = await User.findOne({
                where: {
                    email: email
                }
            })
            const findUsername = await User.findOne({
                where: {
                    username: username
                }
            })
            const isEmail = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}')

            if (firstName && lastName && email && username && password && passwordConfirm) {
                if (!isEmail.test(email)) {
                    throw { message: "email is not valid" }
                } else {
                    if (findEmail) {
                        throw { message: "email had been used" }
                    } else if (findUsername) {
                        throw { message: "username had been used" }
                    } else {
                        if (passwordValidation) {

                            const salt = await bcrypt.genSalt(10)
                            const hashPassword = await bcrypt.hash(password, salt)
                            const result = await User.create({
                                fullName: firstName + " " + lastName,
                                email,
                                username,
                                password: hashPassword,
                                isVerified: false
                            })

                            if (result) {
                                return res.send({
                                    success: true,
                                    message: "register user success",
                                    data: result
                                })
                            } else {
                                throw { message: "register user failed" }
                            }
                        } else {
                            throw { message: "password does not match" }
                        }
                    }
                }
            } else {
                throw { message: "complete the form" }
            }
        } catch (error) {
            res.send({
                success: false,
                message: error.message,
                data: null
            })
        }
    }
}
