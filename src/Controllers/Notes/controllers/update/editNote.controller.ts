import { getNote } from "./../../utils/services/read/getNote.service";
import express, { Request, Response, Router } from "express";
import catchAsync from "../../../../utils/middleware/catchAsync";
import checkJWT from "../../../../utils/middleware/checkJWT";
import {
  createNoteArchive,
  editNote,
} from "../../utils/services/notes.services";

const router: Router = express.Router();

export const editNoteController = router.patch(
  "/edit-note",
  checkJWT,
  catchAsync(async (req: Request, res: Response) => {
    let user_id = req.auth?.payload.sub;

    const { note_id, test_user_id, new_note } = req.body;
    if (test_user_id) user_id = test_user_id;

    if (!user_id) {
      return res.status(401).json({
        status: "error",
        message: "Unauthorized",
      });
    }

    if (!note_id || !new_note) {
      return res.status(400).json({
        status: "error",
        message: "Required fields: 'note_id', 'new_note'",
      });
    }

    const oldNote = await getNote({ note_id, user_id });

    if (!oldNote) {
      return res.status(400).json({
        status: "error",
        message: "There was an error getting the note to edit.",
      });
    }

    await createNoteArchive({
      note_id,
      note: new_note,
      folderId: oldNote.folderId,
      user_id: oldNote.user_id,
    });

    const editedNote = await editNote({
      new_note: new_note,
      note_id,
    });

    res.status(200).send({
      status: "OK",
      message: "Note edited",
      editedNote,
    });
  })
);
