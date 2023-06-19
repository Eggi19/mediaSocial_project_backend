const {userController} = require('../Controllers')
const express = require('express')
const { multerUpload } = require('./../Middlewares/profilePicMulter')
const Router = express.Router()

Router.post('/', userController.registerUser)
Router.post('/verification', userController.userVerification)
Router.put('/edit/:userId', multerUpload.single('profilePicture'), userController.updateUser)
Router.get('/:userId', userController.getUser)
Router.post('/send-email', userController.sendEmailForgetPassword)
Router.patch('/reset-password', userController.resetPassword)

module.exports = Router
