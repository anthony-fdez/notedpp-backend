import { prisma } from "../../../../../../prisma/prisma-client";

interface Props {
  note_id: string;
}

export const getNote = async ({ note_id }: Props) => {
  const note = await prisma.note.findUnique({
    where: {
      id: note_id,
    },
  });

  return note;
};
