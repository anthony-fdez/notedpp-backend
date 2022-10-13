import express from "express";

import { deleteNoteController } from "./controllers/delete/deleteNote.controller";
import { getAllFoldersController } from "./controllers/read/getAllFolders.controller";
import { createNewNoteController } from "./controllers/create/createNote.controller";
import { createNewFolderController } from "./controllers/create/createNewFolder.controller";
import { deleteFolderController } from "./controllers/delete/deleteFolder.controller";
import { deleteAllFoldersController } from "./controllers/delete/deleteAllFolders.controller";
import { getNotesInFolderController } from "./controllers/read/getNotesInFolder.controller";
import { renameFolderController } from "./controllers/update/renameFolder.controller";
import { editNoteController } from "./controllers/update/editNote.controller";
import { deleteNoteHistoryController } from "./controllers/delete/deleteNoteHistory.controller";
import { getNoteHistoryController } from "./controllers/read/getNoteHistory.controller";

const NotesRoutes = express.Router();

NotesRoutes.use("/notes", createNewNoteController);
NotesRoutes.use("/notes", getAllFoldersController);
NotesRoutes.use("/notes", deleteNoteController);
NotesRoutes.use("/notes", createNewFolderController);
NotesRoutes.use("/notes", deleteFolderController);
NotesRoutes.use("/notes", deleteAllFoldersController);
NotesRoutes.use("/notes", getNotesInFolderController);
NotesRoutes.use("/notes", renameFolderController);
NotesRoutes.use("/notes", editNoteController);
NotesRoutes.use("/notes", deleteNoteHistoryController);
NotesRoutes.use("/notes", getNoteHistoryController);

export default NotesRoutes;
