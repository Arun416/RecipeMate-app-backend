const mongoose = require('mongoose');


const createUser = new mongoose.Schema({
    username :{
        type: String,
        required: true
    },
    email :{
        type: String,
        required: true
    },
    password :{
        type: String,
        required: true
    },
     contactNumber: {
        type: String,
     },
     profilePicture: {
        type: String,
     },
    
},{ timestamps: true });


const userData = mongoose.model('User',createUser);

module.exports = userData;