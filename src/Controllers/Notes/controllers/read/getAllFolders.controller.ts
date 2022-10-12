import { getAllFolders } from "../../utils/services/read/getAllFolders.service";
import express, { Request, Response, Router } from "express";
import catchAsync from "../../../../utils/middleware/catchAsync";
import checkJWT from "../../../../utils/middleware/checkJWT";

const router: Router = express.Router();

export const getAllFoldersController = router.get(
  "/get-all-folders",
  checkJWT,
  catchAsync(async (req: Request, res: Response) => {
    const { user_email } = req.body;

    if (!user_email) {
      return res.status(400).send({
        status: "error",
        message: "User email is required",
      });
    }

    const folders = await getAllFolders({ user_email });

    return res.status(200).json({ folders: folders });
  })
);
