const mongoose = require('mongoose');


const CategorySchema = new mongoose.Schema({
    name : {
        type: String,
        required: true
    }
})

const categoryData = mongoose.model('Category',CategorySchema);

module.exports = categoryData;