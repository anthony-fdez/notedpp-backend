import { getAllFoldersController } from "./controllers/read/getAllFolders.controller";
import { newNoteController } from "./controllers/create/createNote.controller";

import express from "express";

const NotesRoutes = express.Router();

NotesRoutes.use("/notes", newNoteController);
NotesRoutes.use("/notes", getAllFoldersController);

export default NotesRoutes;
