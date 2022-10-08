import { ErrorHandler } from "./../../../utils/helpers/errorHandler";
import { IUserInput } from "../../../Models/UserModel";
import { Response, Request } from "express";
import UserModel from "../../../Models/UserModel";
import catchAsync from "../../../utils/middlewares/catchAsync";

export const registerUser = catchAsync(async (req: Request, res: Response) => {
  const { firstName, lastName, password, email }: IUserInput = req.body;

  if (!firstName || !lastName || !password || !email) {
    throw new ErrorHandler("Missing fields", 401);
  }

  const user = await UserModel.create({
    firstName,
    lastName,
    password,
    email,
  });

  res.status(200).json({ user });
});
