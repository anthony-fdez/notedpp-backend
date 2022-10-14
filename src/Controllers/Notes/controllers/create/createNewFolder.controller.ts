import { createFolder } from "./../../utils/services/create/createFolder.service";
// Just create an empty folder

import express, { Request, Response, Router } from "express";
import catchAsync from "../../../../utils/middleware/catchAsync";
import checkJWT from "../../../../utils/middleware/checkJWT";
import { getFolderByName } from "../../utils/services/notes.services";

const router: Router = express.Router();

export const createNewFolderController = router.post(
  "/new-folder",
  checkJWT,
  catchAsync(async (req: Request, res: Response) => {
    let user_id = req.auth?.payload.sub;

    const { folder_name, test_user_id } = req.body;
    if (test_user_id) user_id = test_user_id;

    if (!user_id) {
      return res.status(401).json({
        status: "error",
        message: "Unauthorized",
      });
    }

    if (!folder_name) {
      return res
        .status(400)
        .json({ status: "error", message: "Missing fields" });
    }

    const folder = await getFolderByName({ folder_name, user_id });

    if (folder) {
      return res
        .status(400)
        .json({ status: "error", message: "Folder already exists", folder });
    }

    await createFolder({ user_id, folder_name, res });
  })
);
