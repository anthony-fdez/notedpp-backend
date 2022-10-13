import { Folder } from "@prisma/client";
import { getFolderByName } from "./../../utils/services/read/getFolderByName.service";
import express, { Request, Response, Router } from "express";
import catchAsync from "../../../../utils/middleware/catchAsync";
import checkJWT from "../../../../utils/middleware/checkJWT";
import { deleteFolder } from "../../utils/services/delete/deleteFolder.service";
import { deleteAllNotesInFolder } from "../../utils/services/notes.services";

const router: Router = express.Router();

export const deleteFolderController = router.delete(
  "/delete-folder",
  checkJWT,
  catchAsync(async (req: Request, res: Response) => {
    const { folder_id, folder_name } = req.body;

    if (!folder_id && !folder_name) {
      return res.status(400).json({
        status: "error",
        message: "Missing fields",
      });
    }

    let new_folder_id = "";

    if (folder_name) {
      const folder: Folder = await getFolderByName({ folder_name });

      if (folder) {
        new_folder_id = folder.id;
      } else {
        return res
          .status(400)
          .send({ status: "error", message: "Unable to delete the folder" });
      }
    }

    const deletedNotesCount = await deleteAllNotesInFolder({
      folder_id: new_folder_id,
    });

    await deleteFolder({ folder_id: new_folder_id, deletedNotesCount, res });
  })
);
