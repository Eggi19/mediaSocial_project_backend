const {userController} = require('../Controllers')
const express = require('express')
const Router = express.Router()

Router.post('/', userController.registerUser)
Router.post('/verification', userController.userVerification)
Router.put('/:userId', userController.updateUser)

module.exports = Router
