import {NextFunction, Request, Response} from "express";
import {CompetitionModel} from '../models/competition';
import {NotificationModel} from '../models/notification'
import {ApplicationModel} from "../models/application";

export const create = async (req: Request, res: Response) => {
    const {name} = req.body;
    const competition = CompetitionModel.build({name});
    await competition.save();

    req.flash('success', {msg: 'Competition successfully created!'});
    res.redirect(`/competition/${competition._id}`);
}


export const list = async (req: Request, res: Response) => {
    const competitions = await CompetitionModel.find({});
    const notifications = await NotificationModel.find({userId: req.session.user._id});

    res.render('page/index', {
        competitions: competitions,
        notifications: notifications,
    });
}


export const view = async (req: Request, res: Response) => {
    const id = req.params.id;
    const competition = await CompetitionModel.findById(id).populate({
        path: 'events',
        populate: {
            path: 'applications'
        }
    })
    const competitions = await CompetitionModel.find({});

    res.render('page/competition', {
        competition: competition,
        competitions: competitions,
    });
}

export const update = async (req: Request, res: Response) => {
    const {id, name, status} = req.body;
    const filter = {id: id};
    const update = {name: name, status: status};
    const competition = await CompetitionModel.findOneAndUpdate(filter, update);

    req.flash('success', {msg: 'Competition successfully updated!'});
    res.redirect(`/competition/${competition._id}`);
}

export const remove = async (req: Request, res: Response) => {
    const competition = await CompetitionModel.findByIdAndDelete(req.body.id);
    req.flash('success', {msg: 'Competition successfully deleted!'});
    res.redirect('/');
}

export const generateWinners = async (req: Request, res: Response, next: NextFunction) => {
    const {id, name} = req.body;


    const competition = await CompetitionModel.findByIdAndUpdate(id, {name: name, status: 'expired'})
        .populate({
            path: 'events',
            populate: {
                path: 'applications'
            }
        });

    // generate random winners and send notifications
    for (const event of competition.events) {
        const applications = event.applications.sort(() => 0.5 - Math.random());
        const winningApplications = applications.slice(0, event.ticketSets);

        for (const application of winningApplications) {
            const applicationUpdate = await ApplicationModel.findOneAndUpdate(
                {id: application._id},
                {isWinner: true}
            );

            const eventMessage = `${event.name} | ${event.place} | ${event.address} | ${event.date}`;
            const message = `Congratulations! You've won tickets for ${eventMessage.bold()}`;

            const notification = NotificationModel.build({
                userId: application.userId,
                message: message
            })

            await notification.save();
        }
    }

    req.flash('success', {msg: 'Winners successfully generated!'});
    res.redirect('back')
}