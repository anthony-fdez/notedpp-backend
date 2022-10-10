import { checkJWT } from "./utils/middleware/checkJWT";
/* eslint-disable @typescript-eslint/no-explicit-any */
require("dotenv").config();

import express, { urlencoded } from "express";
import cors from "cors";

// Routers
import NotesRoutes from "./Controllers/Notes/NotesRoutes";
import error from "./utils/middleware/errors";

const app = express();

app.use(cors());
app.use(urlencoded({ extended: true }));
app.use(express.json());

app.use(NotesRoutes);
app.use(error);

export default app;
