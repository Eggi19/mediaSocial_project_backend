const { Model } = require('sequelize')
const db = require('../models')
const Post = db.Post
const Like = db.Like
const Comment = db.Comment

module.exports = {
    createPost: async (req, res) => {
        try {
            const { caption, userId } = req.body

            const result = await Post.create({
                image: req.file.filename,
                caption,
                userId
            })

            res.send({
                success: true,
                message: 'post success',
                data: result
            })
        } catch (error) {
            res.send({
                success: true,
                message: 'post success',
                data: result
            })
        }
    },

    likePost: async (req, res) => {
        try {
            const { postId, userId } = req.body

            const result = await Like.create({
                postId,
                userId
            })

            res.send({
                success: true,
                message: 'like success',
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

    commentPost: async (req, res) => {
        try {
            const { postId, userId, comment } = req.body

            const result = await Comment.create({
                postId,
                userId,
                comment
            })

            res.send({
                success: true,
                message: 'comment success',
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

    getPost: async (req, res) => {
        try {
            const result = await Post.findAll({
                include: [
                    {
                        model: Like
                    },
                    {
                        model: Comment
                    }
                ]
            })

            res.send({
                success: true,
                message: 'get post success',
                data: result
            })
        } catch (error) {
            res.send({
                success: false,
                message: error.message,
                data: null
            })
        }
    }
}
