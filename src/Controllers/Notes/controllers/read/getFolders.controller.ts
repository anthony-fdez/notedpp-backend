import { Request, Response } from "express";
import catchAsync from "../../../../utils/middleware/catchAsync";
import { prisma } from "../../../../../prisma/prisma-client";

export const getFoldersController = catchAsync(
  async (req: Request, res: Response) => {
    const { user_email } = req.body;

    if (!user_email) {
      return res.status(400).send({
        status: "error",
        message: "User email is required",
      });
    }

    const folders = await prisma.folder.findMany({
      where: {
        user_email,
      },
    });

    return res.status(200).json({ folders: folders });
  }
);
