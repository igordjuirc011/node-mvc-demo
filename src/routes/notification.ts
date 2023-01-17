import express from "express";
import * as notificationController from '../controllers/notification';

const router = express.Router();

router.get('/notification/:id', notificationController.markAsSeen);

export {router as notificationRouter}
