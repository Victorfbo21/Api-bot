import UserRouters from "./UserRoutes.js";
import { Router } from "express";
import AuthController from "../Controller/AuthController.js";
const Routers = Router();


Routers.use("/users", AuthController.validateToken, UserRouters);

export default Routers;