import { prisma } from "../../../../../../prisma/prisma-client";

interface Props {
  note_id: string;
  status: string;
}

export const updateNoteStatus = async ({ note_id, status }: Props) => {
  const updatedNote = await prisma.note.update({
    where: {
      id: note_id,
    },
    data: {
      status,
    },
  });

  return updatedNote;
};
