const { Router } = require('express')
const Blog = require('../models/blog.model')


const router = Router()

router.get('', async (req, res)=>{
    try {
        let keyword = req.query.q
        let page = +req.query.page || 0
        let limit = +req.query.limit || 10

        let offset = page * limit
        let filter = [
            {
                $project : {
                    _id : 0,
                    createdAt : 0,
                    updatedAt : 0,
                    htmlContent : 0
                }
            },
            {
                $unwind : "$tags"
            },
            {
                $match : {
                    tags : {$regex :new RegExp(keyword, "i")}
                }
            },
            { 
                $group : {
                    _id : "$blogId"
                }
            }
        ]
        let blogs = await Blog.aggregate([
            ...filter
            ,
            {
                $lookup : {
                    from : "blogsummaries",
                    localField : "_id",
                    foreignField : "_id",
                    as : "blogsOverview"
                }
            },
            {
                $lookup : {
                    from : "users",
                    localField : "blogsOverview.userId",
                    foreignField : "_id",
                    as : "user"
                }
            },
            {
                $skip : offset
            },
            {
                $limit : limit
            }
        ])
        let totalArr = await Blog.aggregate([...filter, { $count : "total"}])
        let total =  Math.ceil(totalArr[0].total/limit)
        blogs = blogs.map(el =>{
            return ({
                _id : el._id,
                blog : el.blogsOverview[0].blog,
                user : el.user[0],
                createdAt : el.blogsOverview[0].createdAt
            })
        })
        return res
        .status(200)
        .send({
            blogs,
            total : total ? total : 0,
            page 
        })
    } catch (error) {
        console.log({ message : error.message})
        return res
        .status(500)
    }
})



module.exports = router