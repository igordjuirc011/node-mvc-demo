import express from "express";
import * as competitionController from '../controllers/competition';

const router = express.Router();
router.get('/', competitionController.list);
router.get('/competition/:id', competitionController.view);
router.post('/competition/create', competitionController.create);
router.post('/competition/:id/update', competitionController.update);
router.post('/competition/:id/delete', competitionController.remove);
router.post('/competition/:id/generate-winners', competitionController.generateWinners)

export {router as competitionRouter}