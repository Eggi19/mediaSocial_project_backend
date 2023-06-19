const transporter = require('../Helpers/transporter')
const db = require('../models')
const User = db.User
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const handlebars = require('handlebars')
const fs = require('fs')

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
                                let payload = { email: email }
                                const token = jwt.sign(payload, 'verification-account')
                                const data = fs.readFileSync('./Supports/template.html', 'utf-8')
                                const tempCompile = await handlebars.compile(data)
                                const tempResult = tempCompile({ token: token })
                                await transporter.sendMail({
                                    from: 'eggiyapari19@gmail.com',
                                    to: email,
                                    subject: 'Account Verification',
                                    html: tempResult
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

            if (!verifiedUser) throw { message: "Unauthorized request" }

            const result = User.update({ isVerified: true }, {
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
    },

    updateUser: async (req, res) => {
        try {
            const { userId } = req.params
            const { username, fullName, bio } = req.body
            const profilePicture = req.file?.filename ? req.file.filename : null

            if (profilePicture) {
                const currentUsername = await User.findOne({
                    where: {
                        id: userId
                    }
                })

                if (currentUsername.username !== username) {
                    const findUsername = await User.findOne({
                        where: {
                            username: username
                        }
                    })

                    if (!findUsername) {
                        const result = await User.update({ username, fullName, bio, profilePicture }, {
                            where: {
                                id: userId
                            }
                        })

                        res.send({
                            status: true,
                            message: "edit profile success",
                            data: result
                        })
                    } else {
                        const errorMessage = {message: "username is already used"}
                        throw errorMessage
                    }
                } else {
                    const result = await User.update({ fullName, bio, profilePicture }, {
                        where: {
                            id: userId
                        }
                    })

                    res.send({
                        status: true,
                        message: "edit profile success",
                        data: result
                    })
                }
            } else {
                const currentUsername = await User.findOne({
                    where: {
                        id: userId
                    }
                })

                if (currentUsername.username !== username) {
                    const findUsername = await User.findOne({
                        where: {
                            username: username
                        }
                    })

                    if (!findUsername) {
                        const result = await User.update({ username, fullName, bio }, {
                            where: {
                                id: userId
                            }
                        })

                        res.send({
                            status: true,
                            message: "edit profile success",
                            data: result
                        })
                    } else {
                        const errorMessage = {message: "username is already used"}
                        throw errorMessage
                    }
                } else {
                    const result = await User.update({ fullName, bio }, {
                        where: {
                            id: userId
                        }
                    })

                    res.send({
                        status: true,
                        message: "edit profile success",
                        data: result
                    })
                }
            }

        } catch (error) {
            res.send({
                status: false,
                message: error.message,
                data: null
            })
        }
    },

    getUser: async (req, res) => {
        try {
            const { userId } = req.params
            const result = await User.findOne({
                where: {
                    id: userId
                }
            })

            if (result) {
                res.send({
                    success: true,
                    message: 'account found',
                    data: result
                })
            } else {
                const errorMessage = "account is not found"
                throw errorMessage
            }

        } catch (error) {
            res.send({
                success: false,
                message: error.message,
                data: null
            })
        }
    },

    sendEmailForgetPassword: async (req, res) => {
        try {
            const { email } = req.body
            let payload = { email: email }
            const token = jwt.sign(payload, 'reset-password')
            console.log(token);

            const data = fs.readFileSync('./Supports/forgetPassword.html', 'utf-8')
            const tempCompile = await handlebars.compile(data)
            const tempResult = tempCompile({ token: token })
            await transporter.sendMail({
                from: 'eggiyapari19@gmail.com',
                to: email,
                subject: 'Forget Password',
                html: tempResult
            })

            res.send({
                success: true,
                message: "send reset password success"
            })
        } catch (error) {
            res.send({
                success: true,
                message: error.message
            })
        }
    },

    resetPassword: async (req, res) => {
        try {
            const { password } = req.body
            const salt = await bcrypt.genSalt(10)
            const hashPassword = await bcrypt.hash(password, salt)

            let token = req.headers.authorization
            token = token.split(' ')[1]
            let verifiedUser = jwt.verify(token, 'reset-password')

            if (!verifiedUser) throw { message: "Unauthorized request" }

            const result = await User.update({ password: hashPassword }, {
                where: {
                    email: verifiedUser.email
                }
            })

            res.send({
                success: true,
                message: "reset password success"
            })
        } catch (error) {
            res.send({
                success: false,
                message: error.message
            })
        }
    }
}
