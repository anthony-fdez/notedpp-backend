import { getNotesInFolder } from "./read/getNotesInFolder.service";
import { createFolder } from "./create/createFolder.service";
import { createNote } from "./create/createNote.service";
import { createFolderAndNote } from "./create/createFolderAndNote.service";
import { getFolderByName } from "./read/getFolderByName.service";
import { getAllFolders } from "./read/getAllFolders.service";
import { deleteNote } from "./delete/deleteNote.service";
import { deleteAllNotesInFolder } from "./delete/deleteAllNotesInFolder.service";
import { deleteFolder } from "./delete/deleteFolder.service";

export {
  // Create
  createFolder,
  createNote,
  createFolderAndNote,
  // Delete
  deleteAllNotesInFolder,
  deleteFolder,
  deleteNote,
  // Read
  getAllFolders,
  getFolderByName,
  getNotesInFolder,
};
