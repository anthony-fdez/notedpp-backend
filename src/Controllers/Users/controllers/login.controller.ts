import { checkJWT } from "./../../../utils/middleware/checkJWT";
import { Request, Response } from "express";
import catchAsync from "../../../utils/middleware/catchAsync";

export const loginUserController = catchAsync(
  async (req: Request, res: Response) => {
    res.status(200).json({ message: "Login" });
  }
);
