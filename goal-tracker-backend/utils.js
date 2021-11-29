import jwt from 'jsonwebtoken';
import Responder from './lib/expressResponder';

module.exports = {
  validateToken: (req, res, next) => {
    const authorizationHeaader = req.headers.authorization;
    let result;
    if (authorizationHeaader) {
      const token = req.headers.authorization.split(' ')[1]; // Bearer <token>
      const options = {
        expiresIn: '7d'
      };
      try {
        result = jwt.verify(token, process.env.JWT_SECRET, options);
        req.decoded = result;
            next();
      } catch (err) {        
        Responder.error(res,{statusCode:401,status:false,msg:err.message})
        throw new Error(err);
      }
    } else {
      result = { 
        msg: `Authentication error,token is required.`,
        status:false,
        statusCode:401
      };
      res.status(401).send(result);
    }
  }
};