import { Response } from "express";
import { prisma } from "../../../../../../prisma/prisma-client";

interface Props {
  folder_name: string;
  user_email: string;
  res: Response;
}

export const createFolder = async ({
  folder_name,
  user_email,
  res,
}: Props): Promise<Response> => {
  const newFolder = await prisma.folder.create({
    data: {
      user_email: user_email,
      folder_name,
    },
  });

  return res.status(200).json({
    status: "OK",
    folder: newFolder,
  });
};
