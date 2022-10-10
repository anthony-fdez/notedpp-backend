import { newNoteController } from "./controllers/newNote.controller";
import { checkJWT } from "../../utils/middleware/checkJWT";

import express from "express";

const NotesRoutes = express.Router();

NotesRoutes.route("/notes/new").post(checkJWT, newNoteController);

export default NotesRoutes;
