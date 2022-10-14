import express, { Request, Response, Router } from "express";
import catchAsync from "../../../../utils/middleware/catchAsync";
import checkJWT from "../../../../utils/middleware/checkJWT";
import { moveNoteToAnotherFolder } from "../../utils/services/notes.services";

const router: Router = express.Router();

export const moveNoteToAnotherFolderController = router.patch(
  "/move-note",
  checkJWT,
  catchAsync(async (req: Request, res: Response) => {
    let user_id = req.auth?.payload.sub;

    const { note_id, new_folder_id, test_user_id } = req.body;
    if (test_user_id) user_id = test_user_id;

    if (!user_id) {
      return res.status(401).json({
        status: "error",
        message: "Unauthorized",
      });
    }

    if (!note_id || !new_folder_id) {
      return res.status(400).json({
        status: "error",
        message: "Required fields: 'note_id', 'new_folder_id'",
      });
    }

    const note = await moveNoteToAnotherFolder({
      note_id,
      folder_id: new_folder_id,
    });

    if (!note) {
      return res.status(400).json({
        status: "error",
        message: "Note does not exist",
      });
    }

    res.status(200).json({
      status: "OK",
      message: "Note moved successfully to another folder",
      note,
    });
  })
);
