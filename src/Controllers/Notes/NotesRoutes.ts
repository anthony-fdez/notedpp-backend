import express from "express";

import { deleteNoteController } from "./controllers/delete/deleteNote.controller";
import { getAllFoldersController } from "./controllers/read/getAllFolders.controller";
import { createNewNoteController } from "./controllers/create/createNote.controller";
import { createNewFolderController } from "./controllers/create/createNewFolder.controller";

const NotesRoutes = express.Router();

NotesRoutes.use("/notes", createNewNoteController);
NotesRoutes.use("/notes", getAllFoldersController);
NotesRoutes.use("/notes", deleteNoteController);
NotesRoutes.use("/notes", createNewFolderController);

export default NotesRoutes;
