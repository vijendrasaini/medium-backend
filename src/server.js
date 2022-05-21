const express = require('express')
const cors = require('cors')

const mongoConnect = require('./configs/db')
const blogController = require('./controllers/blog.controller')
const userController = require('./controllers/user.controller')
const blogsController = require('./controllers/blogSummeries.controller')
const account = require('./controllers/account.controller')

const app = express()
const port = process.env.PORT || 7000

app.use(express.json())
app.use(cors())

app.use('/blog', blogController)
app.use('/user', userController)
app.use('/blogs', blogsController)
app.use('/register', account.signup)
app.use('/login', account.signin)

module.exports = () => {
    try {
        app.listen(7000, async ()=>{
            await mongoConnect()
            console.log(`Server is listening on the port ${port}`)
        })
    } catch (error) {
        console.log({ message : error.message})
    }
}
