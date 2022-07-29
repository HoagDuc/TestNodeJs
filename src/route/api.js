import express from 'express';
import APIController from '../controller/APIController';
let router = express.Router();

const initAPIRoute = (app) => {
  router.get('/get-all-user', APIController.getAllUser);
  router.post('/create-user', APIController.createUser);
  router.delete('/delete-user/:ID', APIController.deleteUser);
  router.put('/update-user', APIController.updateUser);

  return app.use('/api/v1/', router);
};

export default initAPIRoute;
