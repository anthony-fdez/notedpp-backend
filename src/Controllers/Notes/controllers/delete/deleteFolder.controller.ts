import express, { Request, Response, Router } from "express";
import catchAsync from "../../../../utils/middleware/catchAsync";
import checkJWT from "../../../../utils/middleware/checkJWT";
import { deleteFolder } from "../../utils/services/delete/deleteFolder.service";
import { deleteFolderByName } from "../../utils/services/delete/deleteFolderByName.service";
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

    const deletedNotesCount = await deleteAllNotesInFolder({ folder_id });

    if (folder_name) {
      return await deleteFolderByName({ folder_name, deletedNotesCount, res });
    }

    await deleteFolder({ folder_id, deletedNotesCount, res });
  })
);
