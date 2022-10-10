import { getFoldersController } from "./controllers/read/getFolders.controller";
import { newNoteController } from "./controllers/create/createNote.controller";
import { checkJWT } from "../../utils/middleware/checkJWT";

import express from "express";

const NotesRoutes = express.Router();

NotesRoutes.route("/notes/new").post(checkJWT, newNoteController);
NotesRoutes.route("/notes/getFolders").get(checkJWT, getFoldersController);

export default NotesRoutes;
