import express from 'express';
import UtilityController from '../controllers/utilityController';
import ValidateToken from '../../utils';


//Routes for all upload file api 
const initUtilityRoutes = () => {
  const utilityRoutes = express.Router();
  utilityRoutes.post('/uploadImageToDo', UtilityController.uploadImageToDo);
  

  return utilityRoutes;
};

export default initUtilityRoutes;
