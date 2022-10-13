import { Response } from "express";
import { prisma } from "../../../../../../prisma/prisma-client";

interface Props {
  folder_id: string;
  deletedNotesCount: {
    count: number;
  };
  deletedNotesHistoryCount: {
    count: number;
  };
  res: Response;
}

export const deleteFolder = async ({
  folder_id,
  deletedNotesCount,
  deletedNotesHistoryCount,
  res,
}: Props): Promise<Response> => {
  try {
    const deletedFolder = await prisma.folder.delete({
      where: {
        id: folder_id,
      },
    });

    return res.status(200).send({
      status: "OK",
      folder: deletedFolder,
      message: "Folder deleted successfully",
      notesDeleted: deletedNotesCount,
      historyNotesDeleted: deletedNotesHistoryCount,
    });
  } catch (error: unknown) {
    return res.status(400).send({
      status: "error",
      message: "Folder does not exist",
      error,
    });
  }
};
