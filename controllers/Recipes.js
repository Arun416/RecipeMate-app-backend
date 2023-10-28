const RecipesModel = require("../models/Recipes.model");

/* getAllRecipes = async(req,res)=>{
    try{
    const recipes = await RecipesModel.find();

    if(recipes){
        res.status(200).json({success:"true",data:recipes})
    }
    else{
        res.status(400).send("error")
    }
    }
    catch(err){
        res.status(400).send("error")

    }
} */

getAllRecipes = async(req,res) =>{
    const username = req.query.user;
    const catName = req.query.cat;

    try{

    let recipe ;

    if(username){
        recipe = await RecipesModel.find({username});
    }
    else if(catName){
        recipe = await RecipesModel.find({category: {
            $in: [catName]
        }});
    }
    else {
        recipe = await  RecipesModel.find();
    }

    res.status(200).json({success:"true",data:recipe})
    }
    catch(err){
        res.status(400).json(err)
    }
}


getSingleRecipe = async(req,res) =>{
    try{
    const view_recipe = await RecipesModel.findById(req.params.id)
    res.status(200).json({success:"true",data:view_recipe})
    }
    catch(err){
        res.status(400).json(error)
    }
}

createRecipe = async(req,res)=>{
    const{username,
        profilePic,
        recipe_name,
        description,
        prep_time,
        ingredients,
        category,
        preparation_steps,
        servings}= req.body;

    try{
        const url = req.protocol + '://' + req.get('host')
        console.log(url,'url');

        console.log(req.body,'raw');
        // const imgFile  =  req.files['recipe_image'];

       /*  const recipe_image = imgFiles.map(file => ({
            name: file.filename,
            data: file.buffer,
          })); */

        const recipe_info = new RecipesModel({
            username: username,
            profilePic: profilePic,
            category: JSON.parse(category),
            recipe_name: recipe_name,
            description: description,
            prep_time: prep_time,
            ingredients: JSON.parse(ingredients),
            preparation_steps:JSON.parse(preparation_steps),
            servings:servings,
            recipe_image: url + '/images/' + req.file.filename

        })
        console.log(recipe_info);
        const recipe  = await recipe_info.save();
        res.status(200).json({message:"Recipe Created Successfully",data:recipe})
    }
    catch(err){
        res.status(400).json(err)
    }
}


updateRecipe = async(req,res)=>{

    try {
        const id = req.params.id;
        const recipe = await RecipesModel.findById(id);
        if(recipe.username === req.body.username){
        const updatedData = req.body;
        const options = { new: true };

        const result = await RecipesModel.findByIdAndUpdate(
            id, updatedData, options
        )
        
        const recipe = await RecipesModel.findById(id);
        res.status(200).json({message:"Recipe Updated Successfully",data:recipe})
        }
        else{
            res.status(401).json({message: "you can only update your recipe"})
        }
    }
    catch(error){
        res.status(400).json(error)
    }
}

//get all recipe 




module.exports = {getAllRecipes,createRecipe,getSingleRecipe,updateRecipe}