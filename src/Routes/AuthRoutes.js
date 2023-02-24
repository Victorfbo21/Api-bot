import AuthController from "../Controller/AuthController.js";
import { Router } from "express";

const AuthRouter = Router();

AuthRouter.post('/', (req, res) => {
    return AuthController.login(req, res);
})



export default AuthRouter;