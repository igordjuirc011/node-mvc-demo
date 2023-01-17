import express from "express";
import * as eventController from '../controllers/event';

const router = express.Router();

router.post('/event/create', eventController.create);
router.post('/event/:id/delete', eventController.remove);
router.post('/event/:id/update', eventController.update);

export {router as eventRouter}