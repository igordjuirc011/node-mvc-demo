import {NextFunction, Request, Response} from "express";
import {ApplicationModel} from "../models/application";
import {EventModel} from "../models/event";

export const create = async (req: Request, res: Response) => {
    const {eventId, userId} = req.body;
    const application = ApplicationModel.build({
        eventId,
        userId
    });
    await application.save();

    if (application) {
        await EventModel.findByIdAndUpdate(eventId, {$push: {applications: application._id}})
    }

    res.redirect('back');
}

export const remove = async (req: Request, res: Response) => {
    const {eventId, userId} = req.body;

    await ApplicationModel.deleteOne({
        userId: userId,
        eventId: eventId
    });

    res.redirect('back');
}