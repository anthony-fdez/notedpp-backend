import express, { Request, Response, Router } from "express";
import catchAsync from "../../../../utils/middleware/catchAsync";
import checkJWT from "../../../../utils/middleware/checkJWT";
import { deleteAllNotes } from "../../utils/services/delete/deleteAllNotes.service";
import { deleteAllFolders } from "../../utils/services/notes.services";

const router: Router = express.Router();

export const deleteAllFoldersController = router.delete(
  "/delete-all-folders",
  checkJWT,
  catchAsync(async (req: Request, res: Response) => {
    let user_id = req.auth?.payload.sub;

    const { test_user_id } = req.body;
    if (test_user_id) user_id = test_user_id;

    if (!user_id) {
      return res.status(401).json({
        status: "error",
        message: "Unauthorized",
      });
    }

    const deletedNotes = await deleteAllNotes({ user_id });
    const deletedFolders = await deleteAllFolders({ user_id });

    res.status(200).json({
      status: "OK",
      message: "All folders deleted.",
      deletedNotes,
      deletedFolders,
    });
  })
);
