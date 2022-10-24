import { prisma } from "../../../../../../prisma/prisma-client";

interface Props {
  note_id: string;
  user_id: string;
}

export const getNote = async ({ note_id, user_id }: Props) => {
  const note = await prisma.note.findFirst({
    where: {
      id: note_id,
      user_id,
    },
  });

  return note;
};
