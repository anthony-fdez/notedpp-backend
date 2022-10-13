import { prisma } from "../../../../../../prisma/prisma-client";

interface Props {
  user_id: string;
}

export const deleteAllNotes = async ({ user_id }: Props) => {
  const deletedNotes = await prisma.note.deleteMany({
    where: {
      user_id,
    },
  });

  return deletedNotes;
};
