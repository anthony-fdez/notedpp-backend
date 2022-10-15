import { Response } from "express";
import { prisma } from "../../../../../../prisma/prisma-client";

interface Props {
  folder_name: string;
  new_folder_name: string;
  user_id: string;
  res: Response;
}

export const renameFolder = async ({
  folder_name,
  new_folder_name,
  user_id,
  res,
}: Props) => {
  const updatedFolder = await prisma.folder.updateMany({
    where: {
      user_id,
      folder_name: folder_name,
    },
    data: {
      folder_name: new_folder_name,
    },
  });

  return res.status(200).json({
    status: "OK",
    message: "Folder renamed successfully",
    folder: updatedFolder,
  });
};
