import AuthController from "../Controller/AuthController.js";
import { Router } from "express";

const AuthRouter = Router();

AuthRouter.post('/login', AuthController.login);

export default AuthRouter;