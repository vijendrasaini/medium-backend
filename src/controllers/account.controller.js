const jwt = require('jsonwebtoken')
const User = require('../models/user.model')

const newToken = (user) => {
    return jwt.sign({ user }, "admin@media")
}

const signup = async (req, res, next) => {
    try {
        let user = await User.findOne({ email: req.body.email }).lean().exec()
        if (user)
            return res
                .status(400)
                .send(
                    {
                        status: "failure",
                        reason: "User already exits"
                    }
                )
        user = await User.create({
            name: req.body.name,
            username: req.body.email.split('@')[0] ,
            email: req.body.email,
            password: req.body.password
        })
        return res
            .status(201)
            .send({ status: 'success' })
    } catch (error) {
        console.log({ message: error.message })
        return res
            .status(500)
            .send({ status: 'failure' })
    }
}

const signin = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        if (!user)
            return res
                .status(404)
                .send(
                    {
                        status: "failure",
                        reason: 'User not found'
                    }
                )
        const passwordMatch = user.checkPassword(req.body.password)
        if (!passwordMatch)
            return res
                .status(404)
                .send(
                    {
                        status: "failure",
                        reason: 'Credentails are wrong.'
                    }
                )
        const token = newToken(user)
        return res
            .status(200)
            .send(
                {
                    status: "success",
                    user : {
                        name : user.name,
                        avatar : user.avatar,
                        email : user.email,
                        username : user.email,
                        token
                    }
                }
            )
    } catch (error) {
        return res
            .status(500)
            .send({ status: 'failure' })
    }

}

module.exports = { signin, signup, newToken }