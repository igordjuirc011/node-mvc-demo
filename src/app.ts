import express from "express";
import bodyParser from "body-parser";
import path from "path";
import csurf from "csurf";
import session from "express-session";
import cors from 'cors';
import flash from "express-flash";
import MongoStore from "connect-mongo";

import {locals as localsMiddleware} from "./middlewares/locals";
import {auth as authMiddleware} from "./middlewares/auth";
import {authRouter} from "./routes/auth";
import {competitionRouter} from "./routes/competition";
import {eventRouter} from "./routes/event";
import {applicationRouter} from "./routes/application";
import {notificationRouter} from "./routes/notification";
import {errorRouter} from "./routes/error";

const app = express();

app.set('views', path.join(__dirname, '/../views'));
app.set('view engine', 'twig');
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());
app.use(cors());
app.use(session({
        secret: process.env.SESSION_SECRET!,
        resave: false,
        saveUninitialized: true,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
        },
        store: MongoStore.create({
            mongoUrl: process.env.MONGO_URI
        })
    })
);
app.use(csurf());
app.use(flash());
app.use(localsMiddleware);
app.use(authMiddleware);

// routes
app.use(authRouter);
app.use(competitionRouter)
app.use(eventRouter);
app.use(applicationRouter)
app.use(notificationRouter);
app.use(errorRouter);

export default app;