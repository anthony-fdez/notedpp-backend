import { prisma } from "../../../../../../prisma/prisma-client";

interface Props {
  note_id: string;
  folder_id: string;
}

export const moveNoteToAnotherFolder = async ({
  note_id,
  folder_id,
}: Props) => {
  const updatedNote = await prisma.note.update({
    where: {
      id: note_id,
    },
    data: {
      folderId: folder_id,
    },
  });

  return updatedNote;
};
