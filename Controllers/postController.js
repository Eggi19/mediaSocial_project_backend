const db = require('../models')
const Post = db.Post

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
    }
}