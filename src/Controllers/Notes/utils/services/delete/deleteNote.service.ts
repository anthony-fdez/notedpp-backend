import { Response } from "express";
import { prisma } from "../../../../../../prisma/prisma-client";

interface Props {
  note_id: string;
  res: Response;
}

export const deleteNote = async ({
  note_id,
  res,
}: Props): Promise<Response> => {
  const deletedNote = await prisma.note.delete({
    where: {
      id: note_id,
    },
  });

  return res.status(200).send({ status: "OK", note: deletedNote });
};
