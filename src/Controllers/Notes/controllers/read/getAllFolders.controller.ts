import { getAllFolders } from "../../utils/services/read/getAllFolders.service";
import express, { Request, Response, Router } from "express";
import catchAsync from "../../../../utils/middleware/catchAsync";
import checkJWT from "../../../../utils/middleware/checkJWT";

const router: Router = express.Router();

export const getAllFoldersController = router.get(
  "/get-all-folders",
  checkJWT,
  catchAsync(async (req: Request, res: Response) => {
    let user_id = req.auth?.payload.sub;
    const { test_user_id } = req.body;
    if (test_user_id) user_id = test_user_id;

    if (!user_id) {
      return res.status(401).json({
        status: "error",
        message: "Unauthorized",
      });
    }

    const folders = await getAllFolders({ user_id });

    return res.status(200).json({ folders: folders });
  })
);
