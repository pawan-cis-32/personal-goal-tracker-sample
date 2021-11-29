import express from 'express';
import UserController from '../controllers/userController';

//Routes for all user 
const initUserRoutes = () => {
  const userRoutes = express.Router();
  userRoutes.post('/register', UserController.create);
  userRoutes.post('/userLogin', UserController.userLogin);
  userRoutes.post('/createToDoTask', UserController.createToDoTask);
  userRoutes.get('/getToDoList/:user_id', UserController.getToDoList);
  userRoutes.post('/updateToDoDetails', UserController.updateToDoDetails);
  userRoutes.get('/getToDoDetails/:task_id', UserController.getToDoDetails);
  userRoutes.get('/deleteToDoDetails/:task_id', UserController.deleteToDoDetails);

  return userRoutes;
};

export default initUserRoutes;
