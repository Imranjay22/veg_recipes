const mongoose = require('mongoose')

const recipeSchema = new mongoose.Schema({
    title: String,
    description: String,
    imagePath: {
        type: String,
        required: true

    },
    content: String,
    category: {
        type: String,
        enum: ['Breakfast', 'Curry', 'Lunch', 'Snacks', 'Rice', 'Paneer', 'Vegitables', 'Indian Sweets', 'Street Food'],
        required: 'this field is required',
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
})

const Recipe = mongoose.model('Recipe', recipeSchema)


module.exports = Recipe