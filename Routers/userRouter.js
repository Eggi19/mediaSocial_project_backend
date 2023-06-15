const {userController} = require('../Controllers')
const express = require('express')
const Router = express.Router()

Router.post('/', userController.registerUser)
Router.post('/verification', userController.userVerification)

module.exports = Router
