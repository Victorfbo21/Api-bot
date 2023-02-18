import { Router } from "express";
import AuthController from "../Controller/AuthController.js";
import UsersController from "../Controller/UsersController.js";

const UsersRouter = Router();

UsersRouter.use((req, res, next) => {
    console.log('Time:', Date.now())
    next()
})

UsersRouter.use(AuthController.validateToken);

UsersRouter.get('/users', (req, res) => {
    res.json({ id: 1 })
})

UsersRouter.put('/users', (req, res) => {
    return UsersController.InsertUser(req, res);
})

UsersRouter.patch('/users/:id', (req, res) => {
    if (req.body.user == process.env.USER && req.body.password == process.env.PASSWORD) {
        return res.end()
    }
    console.log(token);
    req.json(token);
})

UsersRouter.delete('/users/:id', (req, res) => {
    if (req.body.user == process.env.USER && req.body.password == process.env.PASSWORD) {
        return res.end()
    }
    console.log(token);
    req.json(token);
})

export default UsersRouter;