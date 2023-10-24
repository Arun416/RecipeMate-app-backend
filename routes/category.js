const router = require('express').Router();
const {createCategory,getCategories} = require('../controllers/Category');


router.get('/',getCategories);
router.post('/create',createCategory);


module.exports = router;







