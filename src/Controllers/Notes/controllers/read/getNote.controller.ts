import { getFolderByName } from "./../../utils/services/read/getFolderByName.service";
import express, { Request, Response, Router } from "express";
import catchAsync from "../../../../utils/middleware/catchAsync";
import checkJWT from "../../../../utils/middleware/checkJWT";
import { getNote, getNotesInFolder } from "../../utils/services/notes.services";

const router: Router = express.Router();

export const getNoteController = router.get(
  "/get-note",
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
        message: "'folder_name' is required",
      });
    }

    const note = await getNote({ note_id });

    if (!note) {
      return res.status(400).json({
        status: "error",
        message: "Note does not exist",
      });
    }

    return res.status(200).json({ status: "OK", note });
  })
);
