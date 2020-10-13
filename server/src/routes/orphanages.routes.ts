import { Router } from 'express';
import multer from 'multer';

import OrphanageController from '../controllers/orphanagesController';

import uploadConfig from '../config/upload';

const orphanageRoutes = Router();

const upload = multer(uploadConfig);

const orphanageController = new OrphanageController();

orphanageRoutes.get('/orphanages', orphanageController.index);

orphanageRoutes.get('/orphanages/:id', orphanageController.findOne);

orphanageRoutes.post(
  '/orphanages',
  upload.array('images'),
  orphanageController.create,
);

export default orphanageRoutes;
