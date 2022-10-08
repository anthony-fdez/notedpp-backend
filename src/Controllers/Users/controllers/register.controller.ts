import { emailUniqueness } from './../../../services/checkEmailUnique';
import { logger } from "./../../../logger/logger";
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

    await emailUniqueness(email);

    const user = await prisma.user.create({
      data: {
        email,
        password,
        firstName,
        lastName,
      },
    });
    
    logger.log({
      message: "User Created",
      level: "info",
      user: user,
    });

    res.status(200).json({ user });
  }
);
