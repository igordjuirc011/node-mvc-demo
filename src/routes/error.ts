import express from "express";
import {Request, Response} from "express";

const router = express.Router();

router.get('*', (req: Request, res: Response) => {
    res.status(404).render('page/error-404');
});

export {router as errorRouter}