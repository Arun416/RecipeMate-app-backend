const userModel = require('../models/user')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');




const getUser = async(req,res)=>{
    try{
        const user = await userModel.findById(req.params.id);
        const {password, ...others } = user._doc;
        res.status(200).json(others);
    }
    catch(err) {
        res.status(500).json(err)
    }
}

module.exports = {getUser}