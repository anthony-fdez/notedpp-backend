import { checkJWT } from "./../../utils/middleware/checkJWT";
import { loginUserController } from "./controllers/login.controller";
import { registerUserController } from "./controllers/register.controller";
import express from "express";

const UserRoutes = express.Router();

UserRoutes.route("/user/register").post(registerUserController);
UserRoutes.route("/user/login").post(checkJWT, loginUserController);

export default UserRoutes;
