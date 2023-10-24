const mongoose = require('mongoose');


const ingredientSchema = new mongoose.Schema({
    ingredient_name: {
        type: String
    },
    quantity: {
        type: String
    }
})

module.exports = mongoose.model('Ingredient', ingredientSchema)