import express, { Request, Response, Router } from "express";
import catchAsync from "../../../../utils/middleware/catchAsync";
import checkJWT from "../../../../utils/middleware/checkJWT";
import { updateNoteStatus } from "../../utils/services/notes.services";

const router: Router = express.Router();

export const updateNoteStatusController = router.patch(
  "/update-status",
  checkJWT,
  catchAsync(async (req: Request, res: Response) => {
    let user_id = req.auth?.payload.sub;

    const { note_id, status, test_user_id } = req.body;
    if (test_user_id) user_id = test_user_id;

    if (!user_id) {
      return res.status(401).json({
        status: "error",
        message: "Unauthorized",
      });
    }

    if (!status || !note_id) {
      return res.status(400).json({
        status: "error",
        message: "Required fields: 'note_id', 'status'",
      });
    }

    if (!["note", "not_started", "working", "done"].includes(status)) {
      return res.status(400).json({
        status: "Error",
        message:
          "The only allowed values for the status field are ['note', 'not_started', working', 'done']",
      });
    }

    const editedNote = await updateNoteStatus({ status, note_id });

    res.status(200).send({
      status: "OK",
      message: "Status updated",
      editedNote,
    });
  })
);
