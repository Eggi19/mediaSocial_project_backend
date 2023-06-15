const transporter = require('../Helpers/transporter')
const db = require('../models')
const User = db.User
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

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
                                let payload = {email: email}
                                const token = jwt.sign(payload, 'verification-account', {expiresIn: '1h'})

                                await transporter.sendMail({
                                    from: 'eggiyapari19@gmail.com',
                                    to: email,
                                    subject: 'Account Verification',
                                    html: `<a href="http://localhost:3000/verification?token=${token}">Account Verification</a>`
                                })

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
    },

    userVerification: async (req, res) => {
        try {
            let token = req.headers.authorization
            token = token.split(' ')[1]

            let verifiedUser = jwt.verify(token, 'verification-account')

            if(!verifiedUser) throw {message: "Unauthorized request"}

            const result = User.update({isVerified: true}, {
                where: {
                    email: verifiedUser.email
                }
            })

            res.send({
                success: true,
                message: "verification success",
                data: result
            })
            
        } catch (error) {
            res.send({
                success: false,
                message: error.message,
                data: null
            })
        }
    }
}
