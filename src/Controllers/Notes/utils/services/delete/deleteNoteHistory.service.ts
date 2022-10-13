import { prisma } from "../../../../../../prisma/prisma-client";

interface Props {
  note_id?: string;
  folder_id?: string;
}

export const deleteNoteHistory = async ({ note_id, folder_id }: Props) => {
  if (note_id) {
    const deletedNoteHistory = await prisma.noteHistory.deleteMany({
      where: {
        note_id,
      },
    });

    return deletedNoteHistory;
  } else if (folder_id) {
    const deletedNoteHistory = await prisma.noteHistory.deleteMany({
      where: {
        folderId: folder_id,
      },
    });

    return deletedNoteHistory;
  }
};
