const {getAllRecipes,
        createRecipe,
        getSingleRecipe,
        updateRecipe} = require('../controllers/Recipes');

const router = require('express').Router();


router.get('/',getAllRecipes);
router.get('/:id',getSingleRecipe);
router.post('/new',createRecipe);
router.post('/edit/:id',updateRecipe);

module.exports = router;