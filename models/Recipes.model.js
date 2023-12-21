const mongoose = require('mongoose');

const ingredientSchema = new mongoose.Schema({
    ingredient_name: {
        type: String
    },
    quantity: {
        type: String
    }
})

const recipesSchema = new mongoose.Schema({
    username : {
        required: true,
        type:String
    },
    profilePic: {
        type:String
    },
    category : {
        type: Array,
        required: false,

    },
    recipe_name: {
        required: true,
        type: String
    },
    description:{
        required: true,
        type:String
    },
    prep_time:{
        required: true,
        type:String
    },
    ingredients: [ingredientSchema],
    preparation_steps:{
        required: true,
        type:[String]
    },
    servings:{
        required: true,
        type:Number
    },
    recipe_image:{ type: String },
    cloudinary_id: {type:String}

    }
    
    ,{timestamps: true})






module.exports = mongoose.model('recipes', recipesSchema)