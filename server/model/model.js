const mongoose = require('mongoose');

const DbSchema = mongoose.Schema({
    title:{
        type:String,
        required: true
    },
    image:{
        data: Buffer,
        type: String,
        required: true
    },
    description:{
        type:String,
        required:true
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('blogs',DbSchema)