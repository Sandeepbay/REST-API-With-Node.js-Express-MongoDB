const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required : true
    },
    emailId: {
        type: String,
        required : true
    },
    DOB: {
        type: Date,
    }
})

module.exports = mongoose.model('User' , userSchema)