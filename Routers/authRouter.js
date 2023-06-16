const {authController} = require('../Controllers')
const express = require('express')
const Router = express.Router()

Router.post('/', authController.login)

module.exports = Router
