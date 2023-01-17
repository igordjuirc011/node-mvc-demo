import {NextFunction, Request, Response} from "express";
import {NotificationModel} from '../models/notification';

export const markAsSeen = async (req: Request, res: Response, next: NextFunction) => {
    const notification = await NotificationModel.findOneAndUpdate({id: req.params.id}, {seen: true});
    res.redirect('back');
}