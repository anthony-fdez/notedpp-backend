import express, { Request, Response, Router } from "express";
import catchAsync from "../../../../utils/middleware/catchAsync";
import checkJWT from "../../../../utils/middleware/checkJWT";
import { getNote } from "../../utils/services/notes.services";

const router: Router = express.Router();

export const getNoteSharedController = router.post(
  "/get-note-shared",
  catchAsync(async (req: Request, res: Response) => {
    const { user_id, note_id } = req.body;

    if (!user_id) {
      return res.status(401).json({
        status: "error",
        message: "'user_id' is required.",
      });
    }

    if (!note_id) {
      return res.status(400).json({
        status: "error",
        message: "'note_id' is required",
      });
    }

    const note = await getNote({ note_id, user_id });

    if (!note) {
      return res.status(400).json({
        status: "error",
        message: "Note does not exist",
      });
    }

    return res.status(200).json({ status: "OK", note });
  })
);
