/* eslint-disable @typescript-eslint/no-explicit-any */
require("dotenv").config();

import express, { urlencoded } from "express";
import cors from "cors";

// Routers
// import usersRouter from "./api/users/users";
// import error from "./middleware/error";

const app = express();

app.use(cors());

app.use(urlencoded({ extended: true }));
app.use(express.json());
// app.use(usersRouter);
// app.use(error);

export default app;
