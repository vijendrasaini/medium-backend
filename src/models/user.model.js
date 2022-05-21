const { hashSync, compareSync } = require('bcryptjs')
const { Schema, model } = require('mongoose')

const userSchema = new Schema(
    {
        name: { type : String, required : true},
        username: { type : String, required : true},
        email: { type : String, required : true},
        password: { type : String, required : true},
        avatar : { type : String, default : "https://via.placeholder.com/200"}
    },
    {
        versionKey : false
    }
)


userSchema.pre('save', function(next){
    if(!this.isModified('password')) 
        next()
    this.password = hashSync(this.password)
    next()
})

userSchema.methods.checkPassword = function(password){
    return compareSync(password, this.password)
}

module.exports = model('user', userSchema)
