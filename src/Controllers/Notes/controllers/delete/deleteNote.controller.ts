import { getNote } from "./../../utils/services/read/getNote.service";
import express, { Request, Response, Router } from "express";
import catchAsync from "../../../../utils/middleware/catchAsync";
import checkJWT from "../../../../utils/middleware/checkJWT";
import {
  deleteNote,
  deleteNoteHistory,
} from "../../utils/services/notes.services";

const router: Router = express.Router();

export const deleteNoteController = router.post(
  "/delete-note",
  checkJWT,
  catchAsync(async (req: Request, res: Response) => {
    let user_id = req.auth?.payload.sub;

    const { note_id, test_user_id } = req.body;
    if (test_user_id) user_id = test_user_id;

    if (!note_id) {
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

    const note = await getNote({
      note_id,
      user_id,
    });

    if (!note) {
      return res.status(400).json({
        status: "error",
        message: "Note does not exist",
      });
    }

    await deleteNoteHistory({ note_id });

    await deleteNote({ note_id, res });
  })
);
