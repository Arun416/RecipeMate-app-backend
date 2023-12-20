const {getAllRecipes,
        createRecipe,
        getSingleRecipe,
        updateRecipe,deleteRecipe} = require('../controllers/Recipes');

const router = require('express').Router();

const multer = require('multer');

const path = require('path');

const verifyToken = require('../middlewares/authorization')

const storage = multer.diskStorage({
        destination: (req,file,cb)=>{
           cb(null, 'images/');
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


router.get('/home',getAllRecipes);
router.get('/',verifyToken,getAllRecipes);

router.get('/:id',verifyToken,getSingleRecipe);
router.post('/new',upload.single("recipe_image"),verifyToken,createRecipe);
router.patch('/edit/:id',upload.single("recipe_image"),verifyToken,updateRecipe);
router.delete('/delete/:id',verifyToken,deleteRecipe);


module.exports = router;