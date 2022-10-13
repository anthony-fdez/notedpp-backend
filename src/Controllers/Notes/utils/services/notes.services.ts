import { editNote } from "./update/editNote.service";
import { renameFolder } from "./update/renameFolder.service";
import { getNotesInFolder } from "./read/getNotesInFolder.service";
import { createFolder } from "./create/createFolder.service";
import { createNote } from "./create/createNote.service";
import { createFolderAndNote } from "./create/createFolderAndNote.service";
import { getFolderByName } from "./read/getFolderByName.service";
import { getAllFolders } from "./read/getAllFolders.service";
import { deleteNote } from "./delete/deleteNote.service";
import { deleteAllNotesInFolder } from "./delete/deleteAllNotesInFolder.service";
import { deleteFolder } from "./delete/deleteFolder.service";
import { deleteAllFolders } from "./delete/deleteAllFolders.service";
import { getNote } from "./read/getNote.service";
import { createNoteArchive } from "./create/createNoteArchive.service";
import { deleteNoteHistory } from "./delete/deleteNoteHistory.service";
import { getNoteHistory } from "./read/getNoteHistory.service";

export {
  // Create
  createFolder,
  createNote,
  createFolderAndNote,
  createNoteArchive,
  // Delete
  deleteAllNotesInFolder,
  deleteFolder,
  deleteNote,
  deleteAllFolders,
  deleteNoteHistory,
  // Read
  getAllFolders,
  getFolderByName,
  getNotesInFolder,
  getNote,
  getNoteHistory,
  // Update
  renameFolder,
  editNote,
};
