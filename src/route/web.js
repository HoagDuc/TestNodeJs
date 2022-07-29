import express from 'express';
import homeController from '../controller/homeController';
let router = express.Router();

const initWebRoute = (app) => {
  router.get('/', homeController.getHomePage);
  router.get('/Detail/user/:id', homeController.getDetailPage);
  router.post('/add-new-user', homeController.addNewUser);
  router.post('/delete-user', homeController.deleteUser);
  router.get('/edit-user/:id', homeController.editUser);
  router.post('/update-user', homeController.updateUser);

  return app.use('/', router);
};

export default initWebRoute;
