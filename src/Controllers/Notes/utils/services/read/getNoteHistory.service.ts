import { prisma } from "../../../../../../prisma/prisma-client";

interface Props {
  note_id: string;
}

export const getNoteHistory = async ({ note_id }: Props) => {
  const noteHistory = await prisma.noteHistory.findMany({
    where: {
      note_id,
    },
  });

  return noteHistory;
};
