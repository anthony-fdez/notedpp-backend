// Delete a folder with all notes inside
import express, { Request, Response, Router } from "express";
import catchAsync from "../../../../utils/middleware/catchAsync";
import checkJWT from "../../../../utils/middleware/checkJWT";
import { deleteFolder } from "../../utils/services/delete/deleteFolder.service";

const router: Router = express.Router();

export const deleteFolderController = router.delete(
  "/delete-folder",
  checkJWT,
  catchAsync(async (req: Request, res: Response) => {
    const { folder_id } = req.body;

    if (!folder_id) {
      return res.status(400).json({
        status: "error",
        message: "Missing fields",
      });
    }

    await deleteFolder({ folder_id, res });
  })
);
