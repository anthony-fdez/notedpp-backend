import { ErrorHandler } from "../../../utils/helpers/errorHandler";
import { Response, Request } from "express";
import catchAsync from "../../../utils/middleware/catchAsync";
import { prisma } from "../../../../prisma/prisma-client";

export const registerUserController = catchAsync(
  async (req: Request, res: Response) => {
    const { firstName, lastName, password, email } = req.body;

    if (!firstName || !lastName || !password || !email) {
      throw new ErrorHandler("Missing fields", 401);
    }

    const user = await prisma.user.create({
      data: {
        email,
        password,
        firstName,
        lastName,
      },
    });

    res.status(200).json({ user });
  }
);
