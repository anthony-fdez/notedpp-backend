import { Note } from "@prisma/client";
import { prisma } from "../../../../../../prisma/prisma-client";

interface Props {
  folder_id: string;
}

export const deleteAllNotesInFolder = async ({ folder_id }: Props) => {
  const deletedNotes = await prisma.note.deleteMany({
    where: {
      folderId: folder_id,
    },
  });

  return deletedNotes;
};
