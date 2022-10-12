import express, { Request, Response, Router } from "express";
import catchAsync from "../../../../utils/middleware/catchAsync";
import checkJWT from "../../../../utils/middleware/checkJWT";
import {
  createFolderAndNote,
  createNote,
  getFolder,
} from "../../utils/services/notes.services";

const router: Router = express.Router();

export const createNewNoteController = router.post(
  "/new",
  checkJWT,
  catchAsync(async (req: Request, res: Response) => {
    const { folder_name, user_email, note } = req.body;

    if (!user_email || !note) {
      return res.status(400).json({
        status: "error",
        message: "Missing fields",
      });
    }

    if (!folder_name) {
      const quickNotesFolder = await getFolder({ folder_name: "Quick Notes" });

      if (!quickNotesFolder) {
        return await createFolderAndNote({
          folder_name: "Quick Notes",
          note,
          user_email,
          res,
        });
      } else {
        return await createNote({
          user_email,
          note,
          folderId: quickNotesFolder.id,
          res,
        });
      }
    }

    const folderExist = await getFolder({ folder_name });

    if (!folderExist) {
      return await createFolderAndNote({
        folder_name,
        user_email,
        note,
        res,
      });
    }

    return await createNote({
      user_email,
      note,
      folderId: folderExist.id,
      res,
    });
  })
);
