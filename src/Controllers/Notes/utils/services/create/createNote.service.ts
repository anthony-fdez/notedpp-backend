import { Response } from "express";
import { prisma } from "../../../../../../prisma/prisma-client";

interface Props {
  folderId: string;
  user_id: string;
  note: string;
  res: Response;
}

export const createNote = async ({
  folderId,
  user_id,
  note,
  res,
}: Props): Promise<Response> => {
  const newNote = await prisma.note.create({
    data: {
      user_id,
      note: note,
      folderId,
    },
  });

  return res.status(200).json({
    status: "OK",
    note: newNote,
  });
};
