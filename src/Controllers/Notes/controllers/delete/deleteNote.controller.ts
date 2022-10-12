import express, { Request, Response, Router } from "express";
import catchAsync from "../../../../utils/middleware/catchAsync";
import checkJWT from "../../../../utils/middleware/checkJWT";
import { deleteNote } from "../../utils/services/notes.services";

const router: Router = express.Router();

export const deleteNoteController = router.delete(
  "/delete-note",
  checkJWT,
  catchAsync(async (req: Request, res: Response) => {
    const { note_id } = req.body;

    if (!note_id) {
      return res.status(400).json({
        status: "error",
        message: "Missing fields",
      });
    }

    await deleteNote({ note_id, res });
  })
);
