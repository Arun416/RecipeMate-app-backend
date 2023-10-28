const {getAllRecipes,
        createRecipe,
        getSingleRecipe,
        updateRecipe} = require('../controllers/Recipes');

const router = require('express').Router();

const multer = require('multer');

const path = require('path');

const storage = multer.diskStorage({
        destination: (req,file,cb)=>{
           cb(null, 'images');
        },
        filename: (req,file,cb)=>{
                const fileName = file.fieldname+'-'+Date.now()+ path.extname(file.originalname);
               cb(null, fileName); // Set the file name
 
        }
 })
 
 const upload =  multer({storage: storage,
        fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
          cb(null, true);
        } else {
          cb(null, false);
          return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
      }});

router.get('/',getAllRecipes);
router.get('/:id',getSingleRecipe);
router.post('/new',upload.single("recipe_image"),createRecipe);
router.post('/edit/:id',updateRecipe);

module.exports = router;