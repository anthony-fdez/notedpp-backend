/* eslint-disable @typescript-eslint/no-explicit-any */
require("dotenv").config();

import express, { urlencoded } from "express";
import cors from "cors";

// Routers
import UserRoutes from "./Controllers/Users/UsersRoutes";
import error from "./utils/middlewares/errors";

const app = express();

app.use(cors());

app.use(urlencoded({ extended: true }));
app.use(express.json());
app.use(UserRoutes);
app.use(error);

export default app;
