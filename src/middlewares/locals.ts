import {NextFunction, Request, Response} from "express";

import { SessionData } from "express-session"
declare module "express-session" {
    interface SessionData {
        user: any;
    }
}

export const locals = (req: Request, res: Response, next: NextFunction) => {
    res.locals.user = req.session.user;
    res.locals.csrfToken = req.csrfToken();
    next();
}