const { Router } = require('express')
const ObjectId = require('mongoose').Types.ObjectId
const Blog = require('../models/blog.model')
const BlogSummery = require('../models/blogSummaries.model')



const router = Router()

router.post('/', async (req, res) => {
    try {

        const { userId, blog, htmlContent, tags } = req.body
        const blogSummary = await BlogSummery.create({
            userId,
            blog
        })
        const blogHtml = await Blog.create({
            blogId : blogSummary._id,
            htmlContent,
            tags
        })

        return res
            .status(200)
            .send({status : "success"})
    } catch (error) {
        return res
            .status(500)
            .send({ status : "failure"})
    }
})

router.get('/:blogId', async (req, res) => {
    try {
        let blog = await Blog.aggregate([
            {
                $match : {
                    blogId : ObjectId(req.params.blogId) 
                }
            },
            {
                $lookup : {
                    from : "blogsummaries",
                    localField : "blogId",
                    foreignField : "_id",
                    as : "blogsummery"
                }
            },
            {
                $unwind : "$blogsummery"
            },
            {
                $lookup : {
                    from : "users",
                    localField : "blogsummery.userId",
                    foreignField : "_id",
                    as : "user"
                }
            },
            {
                $unwind : "$user"
            }
        ])
        blog = Array.isArray(blog) ? blog[0] : blog
        return res
            .status(200)
            .send(blog)
    } catch (error) {
        return res
            .status(500)
    }
})



module.exports = router