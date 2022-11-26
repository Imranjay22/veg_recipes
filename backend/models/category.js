const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    imagePath: {
        type: String,
        required: 'this is required'
    },
    desc : {
        type: String,
        required: true,
    }
})

module.exports = mongoose.model('Category', categorySchema)