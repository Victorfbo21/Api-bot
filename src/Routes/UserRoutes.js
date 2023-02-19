import { Router } from "express";
import UsersController from "../Controller/UsersController.js";

const UsersRouter = Router();

UsersRouter.get('/', (req, res) => {
    res.json({ id: 1 })
})

UsersRouter.put('/', (req, res) => {
    return UsersController.InsertUser(req, res);
})

UsersRouter.patch('/:id', (req, res) => {
    if (req.body.user == process.env.USER && req.body.password == process.env.PASSWORD) {
        return res.end()
    }
    console.log(token);
    req.json(token);
})

UsersRouter.delete('/:id', (req, res) => {
    if (req.body.user == process.env.USER && req.body.password == process.env.PASSWORD) {
        return res.end()
    }
    console.log(token);
    req.json(token);
})

export default UsersRouter;