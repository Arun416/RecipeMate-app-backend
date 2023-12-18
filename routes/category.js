const router = require('express').Router();
const {createCategory,getCategories} = require('../controllers/Category');
const verifyToken = require('../middlewares/authorization')


router.get('/',verifyToken,getCategories);
router.get('/home',getCategories);
router.post('/create',createCategory);


module.exports = router;







