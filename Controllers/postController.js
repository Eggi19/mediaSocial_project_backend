const { Model } = require('sequelize')
const db = require('../models')
const Post = db.Post
const Like = db.Like
const Comment = db.Comment
const User = db.User

module.exports = {
    createPost: async (req, res) => {
        try {
            const { caption, userId } = req.body
            const image = req.file.filename

            const result = await Post.create({
                image,
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
                success: false,
                message: error.message,
                data: null
            })
        }
    },

    likePost: async (req, res) => {
        try {
            const { postId, userId } = req.body
            const checkLike = await Like.findOne({
                where: {
                    postId: postId,
                    userId: userId
                }
            })

            if (!checkLike) {
                const result = await Like.create({
                    postId,
                    userId
                })

                res.send({
                    success: true,
                    message: 'like success',
                    data: result
                })
            } else {
                const errorMessage = "post is already liked"
                throw errorMessage
            }
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
                    },
                    {
                        model: User
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
    },

    deletePost: async (req, res) => {
        try {
            const { postId } = req.params
            const result = await Post.destroy({
                where: {
                    id: postId
                }
            })
            res.send({
                success: true,
                message: "delete post success",
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

    editPost: async (req, res) => {
        try {
            const {postId} = req.params
            const {caption} = req.body

            const result = await Post.update({caption}, {
                where: {
                    id: postId
                }
            })

            res.send({
                success: true,
                message: "edit post success",
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
