const jwt = require('jsonwebtoken')
const userModel = require('./models/user')

function validateToken() {
    return async(req, res, next) => {
        try {
          const token = req.header('Authorization').replace('Bearer ', '');
          const decoded = jwt.verify(token,"PRIVATEKEY"); // Replace with your actual secret key
          const user = await userModel.findOne({ _id: decoded._id});
          if (!user) {
            throw new Error();
          }
    
    
          req.data = user;
          req.token = token;
          next();
        } catch (e) {
          res.status(401).json({ error: 'Please authenticate' });
        }
      };
    } //end of function

    module.exports = validateToken