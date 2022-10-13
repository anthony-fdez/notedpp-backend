import express, { Request, Response, Router } from "express";
import catchAsync from "../../../../utils/middleware/catchAsync";
import checkJWT from "../../../../utils/middleware/checkJWT";
import {
  createFolderAndNote,
  createNote,
  getFolderByName,
} from "../../utils/services/notes.services";

const router: Router = express.Router();

export const createNewNoteController = router.post(
  "/new-note",
  checkJWT,
  catchAsync(async (req: Request, res: Response) => {
    let user_id = req.auth?.payload.sub;

    const { folder_name, note, test_user_id } = req.body;
    if (test_user_id) user_id = test_user_id;

    if (!user_id) {
      return res.status(401).json({
        status: "error",
        message: "Unauthorized",
      });
    }

    if (!note) {
      return res.status(400).json({
        status: "error",
        message: "Missing fields",
      });
    }

    if (!folder_name) {
      const quickNotesFolder = await getFolderByName({
        folder_name: "Quick Notes",
      });

      if (!quickNotesFolder) {
        return await createFolderAndNote({
          folder_name: "Quick Notes",
          note,
          user_id,
          res,
        });
      } else {
        return await createNote({
          user_id,
          note,
          folderId: quickNotesFolder.id,
          res,
        });
      }
    }

    const folderExist = await getFolderByName({ folder_name });

    if (!folderExist) {
      return await createFolderAndNote({
        folder_name,
        user_id,
        note,
        res,
      });
    }

    return await createNote({
      user_id,
      note,
      folderId: folderExist.id,
      res,
    });
  })
);
