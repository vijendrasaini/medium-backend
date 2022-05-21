const { Schema, model } = require('mongoose')

const commentSchema = new Schema(
    {
        blogId : { type : Schema.Types.ObjectId, required : true},
        userId : { type : Schema.Types.ObjectId, required : true},
        comment: { type : String }
    },
    {
        versionKey : false,
        timestamps : true
    }
)

module.exports = model('comment', commentSchema)
