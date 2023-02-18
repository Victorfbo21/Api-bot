import express from 'express';
import mongoose from 'mongoose';
import { config } from 'dotenv';
import Routers from './Routes';
import AuthController from './Controller/AuthController.js';

config({
    path: '.env'
});

const port = process.env.PORT || 8080;

const app = express();
app.use(express.json());
app.use('/users', AuthController.validateToken, Routers.UsersRouter);

let MONGO_URL = `mongodb://${process.env.DATABASE_URL}:`;
MONGO_URL += `${process.env.DATABASE_PORT}`;
MONGO_URL += `/${process.env.DATABASE_DB}`;

mongoose.set('strictQuery', false);


mongoose.connect(MONGO_URL,
    {
        "authSource": "admin",
        "user": process.env.DATABASE_USER,
        "pass": process.env.DATABASE_PASSWORD
    }
).then(
    () => {
        console.log('Connected to', process.env.DATABASE_DB)
        app.listen(port, () => {
            console.log(`App listening on port ${port}`)
        })
    }
).catch(
    (e) => console.log('DB connection error:', e)
);
