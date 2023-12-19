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
        const {page,limit,sortField, sortOrder} = req.query;
        const pageNumber = parseInt(page) || 1;
        const limitNumber = parseInt(limit) || 5;
        const skip = (pageNumber - 1) * limitNumber;
        const sortNumber = sortOrder === 'desc' ? -1 : 1;
        const search = req.query.search || "";

        const sort = {};
        if (sortField) {
            sort[sortField] = sortNumber;
        }
        
        let recipe ;
        if(username){
            const [recipeList, total] = await Promise.all([
                RecipesModel.find({ username }).skip(skip).limit(limitNumber).sort(sort),
                RecipesModel.countDocuments({}),
            ]);
        
            const response = {
                error: false,
                total,
                page: pageNumber,
                limit: limitNumber,
                recipeList,
            };
        
            if (recipeList.length === 0) {
                return res.status(200).send({ data: response });
            }
        
            res.status(200).json({ success: true, data: response });
        }
        else if(catName){
            const [recipeList, total] = await Promise.all([
                RecipesModel.find({ category: { $in: [catName] } }).skip(skip).limit(limitNumber).sort(sort),
                RecipesModel.countDocuments({ category: { $in: [catName] } }),
            ]);
        
            const response = {
                error: false,
                total,
                page: pageNumber,
                limit: limitNumber,
                recipeList,
            };
        
            if (recipeList.length === 0) {
                return res.status(200).send({ data: response });
            }
        
            res.status(200).json({ success: true, data: response });
        }
        else {
            const [recipeList, total] = await Promise.all([
                RecipesModel.find({recipe_name: {$regex: search, $options: "i"}}).skip(skip).limit(limitNumber).sort(sort),
                RecipesModel.countDocuments({}),
            ]);
        
            const response = {
                error: false,
                total,
                page: pageNumber,
                limit: limitNumber,
                recipeList,
            };
            
            if (RecipesModel.length === 0) {
                return res.status(200).send({data:response});
            }      
            
            res.status(200).json({success:"true",data:response})
        }

       
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

const createRecipe = async(req,res)=>{
   
        console.log(req.body.recipe_name);
    try {

        const{username,
            profilePic,
            category,
            recipe_name,
            description,
            prep_time,
            ingredients,
            preparation_steps,
            servings}= req.body;


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
        if(recipe){
        res.status(200).json({message:"Recipe Created Successfully",data:recipe})
        }
        else {
        res.status(400).json({message:"Recipe Creation Error",})
        }
    }
    catch(err){
        res.status(400).json(err)
    }
}


const updateRecipe = async(req,res)=>{
    const url = req.protocol + '://' + req.get('host')
    console.log(req.params.id);
    req.body.category = JSON.parse(req.body.category);
    req.body.ingredients = JSON.parse(req.body.ingredients);
    req.body.preparation_steps = JSON.parse(req.body.preparation_steps) 
    if (req.file) {
        // If an image was uploaded, use the newly uploaded file
        req.body.recipe_image = url + '/images/' + req.file.filename
    } else if (req.body.recipe_image) {
        // If no file was uploaded but an existing image path is provided in the request body, use it
        req.body.recipe_image  = req.body.recipe_image;
    } else {
        // No file uploaded and no existing image path provided
        req.body.recipe_image = null;
    }
   
    /* const recipe_updated_info = new RecipesModel({
        username: req.body.username,
        profilePic: req.body.profilePic,
        category: category,
        recipe_name: req.body.recipe_name,
        description: req.body.description,
        prep_time: req.body.prep_time,
        ingredients: ingred,
        preparation_steps:cookTime,
        servings:req.body.servings,
        recipe_image: req.body.recipe_image,
    })
 */

    try {

         const ID = req.params.id;
         const options = { new: true };
        console.log(req.body.recipe_image);
        const result = await RecipesModel.findByIdAndUpdate(ID,req.body,options);
        if(result){
        const editedRecipe = await RecipesModel.findById(ID)
        res.status(200).json({message:"Recipe Updated Successfully",data:result})
        }

    }
    catch(error){
        res.status(400).json({message:error.message})
    }
}


deleteRecipe = async(req,res)=>{
    try{
        const id = req.params.id;
        // const recipe = await RecipesModel.findById(id);
        
            const deletedItem = await RecipesModel.findByIdAndRemove(id);
            if (!deletedItem) {
                return res.status(404).json({ message: 'Item not found' });
            }
           

            const refreshRecipes = await RecipesModel.findById(id);
            if(refreshRecipes){
                res.status(200).json({ message: 'Recipe deleted successfully', refreshRecipes });
            }
        
    }
    catch(error){
        res.status(500).json({ message: 'Error deleting item', error: error.message });
    }
}

//get all recipe 




module.exports = {getAllRecipes,createRecipe,getSingleRecipe,updateRecipe,deleteRecipe}