const {postController} =require('../Controllers')
const express = require('express')
const { multerUpload } = require('./../Middlewares/multer')
const Router = express.Router()

Router.post('/single-upload', multerUpload.single('image'), postController.createPost)

module.exports = Router
