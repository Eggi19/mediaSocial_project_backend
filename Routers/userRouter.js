const {userController} = require('../Controllers')
const express = require('express')
const Router = express.Router()

Router.post('/', userController.registerUser)
Router.post('/verification/:token', userController.registerUser)

module.exports = Router
