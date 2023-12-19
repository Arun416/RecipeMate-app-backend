const express = require('express');
const cors = require('cors');
const user_routes  = require('./routes/users');
const auth_routes  = require('./routes/auth');
const recipe_routes = require('./routes/recipe_post');
const category_routes = require('./routes/category');

const mongoose = require("mongoose");
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true, limit: '10mb'}));
require('dotenv').config();

app.use('/api/user',user_routes);
app.use('/api/auth',auth_routes);
app.use('/api/recipe',recipe_routes);
app.use('/api/category',category_routes);
app.use('/api/trend/recipe',recipe_routes);
app.use('/images',express.static('images'));

const Url = process.env.MONGO_URL
const port =process.env.PORT;

console.log(Url,"",port)
mongoose.connect(Url).then(res=>{
    if(res){
        console.log("Database connected");
    }
    else {
        console.log("Connection Error!!!");
    }
})


app.listen(port,()=>{
    console.log("Server running on Port : 3000");
})