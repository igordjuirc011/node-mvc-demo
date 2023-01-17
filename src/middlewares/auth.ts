import {NextFunction, Request, Response} from "express";

export const auth = (req: Request, res: Response, next: NextFunction) => {

    const ignoredUrls = [
        '/login',
        '/logout',
        '/signup'
    ]
    if (ignoredUrls.includes(req.originalUrl)) {
        return next();
    } else {
        if (!req.session.user) {
            return res.redirect('/login');
        }
    }

    return next();
}