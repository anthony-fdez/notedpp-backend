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
  try {
    const deletedNote = await prisma.note.delete({
      where: {
        id: note_id,
      },
    });

    return res.status(200).json({
      status: "OK",
      note: deletedNote,
      message: "Note deleted successfully",
    });
  } catch (error: unknown) {
    return res.status(400).json({
      status: "error",
      message: "Note does not exist",
      error,
    });
  }
};
