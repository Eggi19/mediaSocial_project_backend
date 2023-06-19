const {postController} =require('../Controllers')
const express = require('express')
const { multerUpload } = require('./../Middlewares/multer')
const Router = express.Router()

Router.post('/single-upload', multerUpload.single('image'), postController.createPost)
Router.post('/like', postController.likePost)
Router.post('/comment', postController.commentPost)
Router.get('/', postController.getPost)
Router.delete('/:postId', postController.deletePost)

module.exports = Router
