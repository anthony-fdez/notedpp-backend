import { Folder } from "@prisma/client";
import { getFolderByName } from "./../../utils/services/read/getFolderByName.service";
import express, { Request, Response, Router } from "express";
import catchAsync from "../../../../utils/middleware/catchAsync";
import checkJWT from "../../../../utils/middleware/checkJWT";
import { deleteFolder } from "../../utils/services/delete/deleteFolder.service";
import {
  deleteAllNotesInFolder,
  deleteNoteHistory,
} from "../../utils/services/notes.services";

const router: Router = express.Router();

export const deleteFolderController = router.post(
  "/delete-folder",
  checkJWT,
  catchAsync(async (req: Request, res: Response) => {
    let user_id = req.auth?.payload.sub;

    const { folder_id, folder_name, test_user_id } = req.body;
    if (test_user_id) user_id = test_user_id;

    if (!folder_id && !folder_name) {
      return res.status(400).json({
        status: "error",
        message: "Missing fields",
      });
    }

    if (!user_id) {
      return res.status(401).json({
        status: "error",
        message: "Unauthorized",
      });
    }

    let new_folder_id = folder_id;

    if (folder_name) {
      const folder: Folder = await getFolderByName({ folder_name, user_id });

      if (folder) {
        new_folder_id = folder.id;
      } else {
        return res.status(400).send({
          status: "error",
          message: "Unable to delete the folder",
        });
      }
    }

    const deletedNotesHistoryCount: any = await deleteNoteHistory({
      folder_id,
    });

    const deletedNotesCount = await deleteAllNotesInFolder({
      folder_id: new_folder_id,
    });

    await deleteFolder({
      folder_id: new_folder_id,
      deletedNotesCount,
      deletedNotesHistoryCount,
      res,
    });
  })
);
