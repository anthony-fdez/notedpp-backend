import { Response } from "express";
import { prisma } from "../../../../../../prisma/prisma-client";

interface Props {
  folder_name: string;
  deletedNotesCount: {
    count: number;
  };
  res: Response;
}

export const deleteFolderByName = async ({
  folder_name,
  deletedNotesCount,
  res,
}: Props): Promise<Response> => {
  try {
    const deletedFolder = await prisma.folder.delete({
      where: {
        folder_name,
      },
    });

    return res.status(200).send({
      status: "OK",
      folder: deletedFolder,
      message: "Folder deleted successfully",
      notesDeleted: deletedNotesCount,
    });
  } catch (error: unknown) {
    return res.status(400).send({
      status: "error",
      message: "Folder does not exist",
      error,
    });
  }
};
