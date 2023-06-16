const db = require('../models')
const User = db.User
const bcrypt = require('bcrypt')

module.exports = {
    login: async (req, res) => {
        try {
            console.log('masuk backend');
            const { usernameOrEmail, password } = req.body
            const isEmail = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}')

            if (isEmail.test(usernameOrEmail)) {
                const getUser = await User.findOne({
                    where: {
                        email: usernameOrEmail
                    }
                })

                if (getUser) {
                    const isValid = await bcrypt.compare(password, getUser.password)
                    if (isValid) {
                        res.send({
                            success: true,
                            message: "Login Success",
                            data: getUser
                        })
                    } else {
                        throw { message: "Incorrect Password" }
                    }
                } else {
                    throw { message: "account is not found" }
                }
            } else {
                const getUser = await User.findOne({
                    where: {
                        username: usernameOrEmail
                    }
                })

                if (getUser) {
                    const isValid = await bcrypt.compare(password, getUser.password)
                    if (isValid) {
                        res.send({
                            success: true,
                            message: "Login Success",
                            data: getUser
                        })
                    } else {
                        throw { message: "Incorrect Password" }
                    }
                } else {
                    throw { message: "account is not found" }
                }
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
