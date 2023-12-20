const router = require('express').Router();
const {createCategory,getCategories} = require('../controllers/Category');
const verifyToken = require('../middlewares/authorization')



router.get('/home',getCategories);
router.get('/',verifyToken,getCategories);
router.post('/create',createCategory);


module.exports = router;







