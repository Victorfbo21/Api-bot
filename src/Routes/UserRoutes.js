import { Router } from "express";
import UsersController from "../Controller/UsersController.js";

const UsersRouter = Router();

UsersRouter.get('/', (req, res) => {
    return UsersController.getUsers(req, res);
})

UsersRouter.put('/', (req, res) => {
    return UsersController.insertUser(req, res);
})



export default UsersRouter;