const { Schema, model } = require('mongoose')

const blogSummariesSchema = new Schema(
    {
        userId : { type : Schema.Types.ObjectId, required : true},
        blog : {
                title: { type : String},
                image: { type : String},
                body : { type : String}
            }
    },
    {
        versionKey : false,
        timestamps : true
    }
)

module.exports = model('blogSummary', blogSummariesSchema)
