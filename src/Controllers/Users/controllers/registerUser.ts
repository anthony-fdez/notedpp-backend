import { ErrorHandler } from "./../../../utils/helpers/errorHandler";
import { Response, Request } from "express";
import catchAsync from "../../../utils/middlewares/catchAsync";

export const registerUser = catchAsync(async (req: Request, res: Response) => {
  res.status(200).json({ status: "ok" });
});
