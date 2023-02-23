import { Router } from "express";
import UsersController from "../Controller/UsersController.js";

const SignupRouter = Router();

SignupRouter.put('/', (req, res) => {
    return UsersController.signup(req, res);
})



export default SignupRouter;