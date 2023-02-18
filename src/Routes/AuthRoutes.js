import AuthController from "../Controller/AuthController.js";
import { Router } from "express";

const AuthRouter = Router();

AuthRouter.use('login', AuthController.login);

export default AuthRouter;