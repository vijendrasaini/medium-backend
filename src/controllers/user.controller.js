const { Router } = require('express')
const User = require('../models/user.model')


const router = Router()

router.post('/', async (req, res)=>{
    try {
        const user = await User.create(req.body)
        return res
        .status(200)
        .send(user)
    } catch (error) {
        return res
        .status(500)
    }
})



module.exports = router