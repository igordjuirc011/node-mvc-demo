import {NextFunction, Request, Response} from "express";
import {UserModel} from "../models/user";
const bcrypt = require("bcryptjs");

export const getLogin = async (req: Request, res: Response) => {
    if (req.session.user) {
        return res.redirect('/');
    }

    res.render('page/login');
}

export const postLogin = async (req: Request, res: Response) => {
    const {email, password} = req.body;
    const user = await UserModel.findOne({email: email});

    if (!user) {
        req.flash('errors', { msg: 'Invalid credentials' });
        return res.redirect('/login');
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
        req.flash('errors', { msg: 'Invalid credentials' });
        return res.redirect('/login');
    }

    req.session.user = user;
    res.redirect('/');
}

export const getSignup = (req: Request, res: Response) => {
    if (req.session.user) {
        return res.redirect('/');
    }

    res.render('page/signup');
}

export const postSignUp = async (req: Request, res: Response) => {
    const {name, email} = req.body;

    const existingUser = await UserModel.findOne({email: email});

    if (existingUser) {
        req.flash('errors', {msg: 'Account with that email address already exists.'} );
        return res.redirect('/signup');
    }

    const password = await bcrypt.hash(req.body.password, 12);
    const user = UserModel.build({
        name,
        email,
        password
    })

    await user.save()

    req.flash('success', {msg: 'You are successfully signed up!'} );
    req.session.user = user;
    res.redirect('/');
}


export const postLogout = (req: Request, res: Response) => {
    req.session.destroy((err: any) => {
        res.redirect('/login');
    });
};