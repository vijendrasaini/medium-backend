const { Schema, model } = require('mongoose')

const blogSchema = new Schema(
    {
        blogId : {type : Schema.Types.ObjectId, required : true},
        htmlContent : { type : String, required : true},
        tags : [{ type : String}]
    },
    {
        versionKey : false,
        timestamps : true
    }
)

module.exports = model('blog', blogSchema)
