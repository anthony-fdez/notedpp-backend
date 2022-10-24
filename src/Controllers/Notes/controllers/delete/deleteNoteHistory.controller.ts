import { getNote } from "./../../utils/services/read/getNote.service";
import express, { Request, Response, Router } from "express";
import catchAsync from "../../../../utils/middleware/catchAsync";
import checkJWT from "../../../../utils/middleware/checkJWT";
import { deleteNoteHistory } from "../../utils/services/notes.services";

const router: Router = express.Router();

export const deleteNoteHistoryController = router.post(
  "/delete-note-history",
  checkJWT,
  catchAsync(async (req: Request, res: Response) => {
    let user_id = req.auth?.payload.sub;
    const { test_user_id, note_id } = req.body;
    if (test_user_id) user_id = test_user_id;

    if (!user_id) {
      return res.status(401).json({
        status: "error",
        message: "Unauthorized",
      });
    }

    if (!note_id) {
      return res.status(400).json({
        status: "error",
        message: "Missing fields",
      });
    }

    const note = await getNote({ note_id, user_id });

    if (!note) {
      return res.status(400).json({
        status: "error",
        message: "Note does not exist",
      });
    }

    const deletedNotesHistory = await deleteNoteHistory({ note_id });

    return res.status(200).send({
      status: "OK",
      message: "History archive deleted",
      deletedNotesHistory,
    });
  })
);
