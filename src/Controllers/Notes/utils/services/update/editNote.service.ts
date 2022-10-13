import { prisma } from "../../../../../../prisma/prisma-client";

interface Props {
  note_id: string;
  new_note: string;
}

export const editNote = async ({ note_id, new_note }: Props) => {
  const updatedNote = await prisma.note.update({
    where: {
      id: note_id,
    },
    data: {
      note: new_note,
    },
  });

  return updatedNote;
};
