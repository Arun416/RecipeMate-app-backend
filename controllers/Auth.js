const userModel = require('../models/user')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const createAccount = async(req,res)=>{
    try {
        const {username,email,password} = req.body;

        let user = await userModel.findOne({ email: email });

        if(user){
            res.status(400).json({message:"User Already Exists!"})
        }
        else {
            const user = new userModel({
                username: username,
                email: email,
                password:password,
            })

            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);
            const result = await user.save();
            if(result){
                res.status(200).json({success:true,message:"Your Account Created Successfully"})
            }
            else {
                res.status(400).json({success:true,message:"Something went wrong! user not created"})

            }
        }
    }
    catch(error) {
        res.status(500).send(error)
    }
}


const LoginAccount = async(req,res)=>{
    try {
        const {email,password,rememberMe} = req.body;

        let user = await userModel.findOne({ email:email  });
        if (!user) {
            return res.status(401).json({ succes:false,message:'Incorrect email or password.'});
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ succes:false,message:'Incorrect email or password.'});
        }
        // const expireTime =  Math.floor(Date.now() / 1000) + 3600 * 4;
        const userData = {
            username: user.username,
            email: user.email,
            id: user._id
        }
        const expiresTime = '2m';
        return res.status(200).json({ success:true, token: jwt.sign({expiresIn: rememberMe==true ? '1d' : expiresTime,userData }, process.env.API_SECRET) ,data:user});
    }
    catch(error) {
        res.status(500).send({message:error});
    }
}


module.exports = {createAccount,LoginAccount}