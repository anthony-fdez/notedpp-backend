import { registerUser } from "./controllers/registerUser";
import express from "express";

const UserRoutes = express.Router();

UserRoutes.route("/register").post(registerUser);

export default UserRoutes;
