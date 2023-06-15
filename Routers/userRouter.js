const {userController} = require('../Controllers')
const express = require('express')
const Router = express.Router()

Router.post('/', userController.registerUser)

module.exports = Router
