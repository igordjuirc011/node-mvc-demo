import {NextFunction, Request, Response} from "express";
import {EventModel} from '../models/event';
import {CompetitionModel} from "../models/competition";

export const create = async (req: Request, res: Response, next: NextFunction) => {
    const {name, place, address, date, ticketSets, tickets, competitionId} = req.body;
    const event = EventModel.build({name, place, address, date, ticketSets, tickets, competitionId});
    await event.save();

    if (event) {
        await CompetitionModel.findByIdAndUpdate(
            competitionId, {$push: {events: event._id}},
        );
    }

    req.flash('success', {msg: 'Event successfully created!'});
    res.redirect(`/competition/${competitionId}`);
}

export const update = async (req: Request, res: Response, next: NextFunction) => {
    const {id, name, place, address, date, ticketSets, tickets, competitionId} = req.body;
    const event = await EventModel.findByIdAndUpdate(id, {
            name, place, address, date, ticketSets, tickets, competitionId
        }
    );
    req.flash('success', {msg: 'Event successfully updated!'});
    res.redirect(`/competition/${competitionId}`);
}

export const remove = async (req: Request, res: Response, next: NextFunction) => {
    const {id, competitionId} = req.body;
    const event = await EventModel.findByIdAndDelete(id);
    req.flash('success', {msg: 'Event successfully deleted!'});
    res.redirect(`/competition/${competitionId}`);
}