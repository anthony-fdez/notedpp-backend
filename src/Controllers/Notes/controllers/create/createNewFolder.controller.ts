import { createFolder } from "./../../utils/services/create/createFolder.service";
// Just create an empty folder

import express, { Request, Response, Router } from "express";
import catchAsync from "../../../../utils/middleware/catchAsync";
import checkJWT from "../../../../utils/middleware/checkJWT";

const router: Router = express.Router();

export const createNewFolderController = router.post(
  "/new-folder",
  checkJWT,
  catchAsync(async (req: Request, res: Response) => {
    const { folder_name, user_email } = req.body;

    if (!folder_name || !user_email) {
      return res
        .status(400)
        .json({ status: "error", message: "Missing fields" });
    }

    await createFolder({ user_email, folder_name, res });
  })
);
