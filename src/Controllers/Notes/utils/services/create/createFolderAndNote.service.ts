import { Response } from "express";
import { prisma } from "../../../../../../prisma/prisma-client";

interface Props {
  folder_name: string;
  user_id: string;
  note: string;
  res: Response;
}

export const createFolderAndNote = async ({
  folder_name,
  user_id,
  note,
  res,
}: Props): Promise<Response> => {
  const folder = await prisma.folder.create({
    data: {
      folder_name,
      user_id,
    },
  });

  const newNote = await prisma.note.create({
    data: {
      user_id,
      note,
      folderId: folder.id,
    },
  });

  return res.status(200).send({ status: "OK", note: newNote });
};
