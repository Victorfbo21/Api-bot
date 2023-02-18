import express from 'express';
import mongoose from 'mongoose';
import { config } from 'dotenv';
import * as UserController from './Controller/UserController.js';

config({
    path: '.env'
});
const port =8080;
const app = express();
app.use(express.json());

let MONGO_URL = `mongodb://${process.env.DATABASE_USER}:`;
MONGO_URL += `${process.env.DATABASE_PASSWORD}@`;
MONGO_URL += `${process.env.DATABASE_URL}:`;
MONGO_URL += `${process.env.DATABASE_PORT}`;
mongoose.set('strictQuery', false);

app.get('/users', (req, res) => {
     return console.log('Online');
})

app.put('/users', (req, res) => {
    return UserController.InsertUser(req, res);
})

app.patch('/users/$id', (req, res) => {
    if (req.body.user == process.env.USER && req.body.password == process.env.PASSWORD) {
        return res.end()
    }

})

app.delete('/users/$id', (req, res) => {
    if (req.body.user == process.env.USER && req.body.password == process.env.PASSWORD) {
        return res.end()
    }
   
})

mongoose.connect(MONGO_URL).then(
    () => {
        console.log('Connected to', process.env.DATABASE_DB)
        app.listen(port, () => {
            console.log(`App listening on port ${port}`)
        })
    }
).catch(
    (e) => console.log('DB connection error:', e)
);
