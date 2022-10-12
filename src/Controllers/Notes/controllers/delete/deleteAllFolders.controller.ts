import { auth } from "express-oauth2-jwt-bearer";
import express, { Request, Response, Router } from "express";
import catchAsync from "../../../../utils/middleware/catchAsync";
import checkJWT from "../../../../utils/middleware/checkJWT";
import { deleteFolder } from "../../utils/services/delete/deleteFolder.service";

const router: Router = express.Router();

export const deleteAllFoldersController = router.delete(
  "/delete-all-folders",
  checkJWT,
  catchAsync(async (req: Request, res: Response) => {
    res.json(req.auth);
  })
);
