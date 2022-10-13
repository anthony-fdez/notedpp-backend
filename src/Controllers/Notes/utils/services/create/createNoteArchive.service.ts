import { prisma } from "../../../../../../prisma/prisma-client";

interface Props {
  folderId: string;
  user_id: string;
  note: string;
  note_id: string;
}

export const createNoteArchive = async ({
  note_id,
  folderId,
  user_id,
  note,
}: Props) => {
  const noteArchive = await prisma.noteHistory.create({
    data: {
      user_id,
      note_archive_text: note,
      folderId,
      note_id,
    },
  });

  return noteArchive;
};
