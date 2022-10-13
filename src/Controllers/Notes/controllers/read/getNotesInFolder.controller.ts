import { getFolderByName } from "./../../utils/services/read/getFolderByName.service";
import express, { Request, Response, Router } from "express";
import catchAsync from "../../../../utils/middleware/catchAsync";
import checkJWT from "../../../../utils/middleware/checkJWT";
import { getNotesInFolder } from "../../utils/services/notes.services";

const router: Router = express.Router();

export const getNotesInFolderController = router.get(
  "/get-notes-in-folder",
  checkJWT,
  catchAsync(async (req: Request, res: Response) => {
    let user_id = req.auth?.payload.sub;
    const { test_user_id, folder_name } = req.body;
    if (test_user_id) user_id = test_user_id;

    if (!user_id) {
      return res.status(401).json({
        status: "error",
        message: "Unauthorized",
      });
    }

    if (!folder_name) {
      return res.status(400).json({
        status: "error",
        message: "'folder_name' is required",
      });
    }

    const folder = await getFolderByName({ folder_name });

    if (!folder) {
      return res.status(400).json({
        status: "error",
        message: "Folder does not exist",
      });
    }

    const notes = await getNotesInFolder({ folder_id: folder.id });

    return res.status(200).json({ status: "OK", folder, notes });
  })
);
