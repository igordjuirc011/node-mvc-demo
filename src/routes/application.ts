import express from "express";
import * as applicationController from '../controllers/application';

const router = express.Router();

router.post('/application/create', applicationController.create);
router.post('/application/delete', applicationController.remove);


export {router as applicationRouter}
