const router = require('express').Router();
const {createAccount,LoginAccount} = require('../controllers/Auth')

router.post('/signup',createAccount);
router.post('/login',LoginAccount);

module.exports = router;