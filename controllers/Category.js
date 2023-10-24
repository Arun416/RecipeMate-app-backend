const CategoryModel = require("../models/Category");


const createCategory = async(req,res)=>{
    const newCat = new CategoryModel(req.body)

    try {
        const savedCat = await newCat.save();

        res.status(200).json({success:true,message:"Category created",data: savedCat})
    }
    catch(err) {
        res.status(500).json(err);
    }
}


const getCategories = async(req,res)=>{
    

    try {
        const savedCat = await CategoryModel.find();

        res.status(200).json({success:true,data: savedCat})
    }
    catch(err) {
        res.status(500).json(err);
    }
}

module.exports = {createCategory,getCategories};
