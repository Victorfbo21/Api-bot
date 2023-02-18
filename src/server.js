import express from 'express';
import mongoose from 'mongoose';
import { config } from 'dotenv';
import * as UserController from './Controller/UserController.js';
import Auth from './Auth/Auth.js';
config({
    path: '.env'
});

const port = process.env.PORT || 8080;

const app = express();
app.use(express.json());
app.use(Auth.validateToken)
let MONGO_URL = `mongodb://${process.env.DATABASE_URL}:`;
MONGO_URL += `${process.env.DATABASE_PORT}`;
MONGO_URL += `/${process.env.DATABASE_DB}`;

mongoose.set('strictQuery', false);

app.get('/users', (req, res) => {
    res.json({ id: 1 })
})

app.put('/users', (req, res) => {
    return UserController.InsertUser(req, res);
})

app.patch('/users/$id', (req, res) => {
    if (req.body.user == process.env.USER && req.body.password == process.env.PASSWORD) {
        return res.end()
    }
    console.log(token);
    req.json(token);

})

app.delete('/users/$id', (req, res) => {
    if (req.body.user == process.env.USER && req.body.password == process.env.PASSWORD) {
        return res.end()
    }
    console.log(token);
    req.json(token);
})

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
