const express = require('express')
const router = express.Router();
const {getUser} = require('../controllers/Users')
const verifyToken = require('../middlewares/authorization')


router.get('/',verifyToken,getUser)


module.exports = router;