// Just create an empty folder

import express, { Request, Response, Router } from "express";
import catchAsync from "../../../../utils/middleware/catchAsync";
import checkJWT from "../../../../utils/middleware/checkJWT";
import {
  createFolderAndNote,
  createNote,
  getFolder,
} from "../../utils/services/notes.services";

const router: Router = express.Router();

export const createNewFolderController = router.post(
  "/new-folder",
  checkJWT,
  catchAsync(async (req: Request, res: Response) => {
    const { folder_name, user_email } = req.body;

    console.log(req.auth);
  })
);
