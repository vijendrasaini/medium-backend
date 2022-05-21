const { connect } = require('mongoose')

// const db = `mongodb://localhost:27017/medium`
const db = `mongodb+srv://medium:medium@cluster0.vkswr.mongodb.net/mediumRemote?retryWrites=true&w=majority`


module.exports = () => connect(db)