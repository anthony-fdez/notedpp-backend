import { getFolderByName } from "./getFolderByName.service";
import { Note } from "@prisma/client";
import { prisma } from "../../../../../../prisma/prisma-client";

interface Props {
  folder_id: string;
}

export const getNotesInFolder = async ({
  folder_id,
}: Props): Promise<Note[]> => {
  const notes: Note[] = (await prisma.note.findMany({
    where: {
      folderId: folder_id,
    },
  })) as unknown as Note[];

  return notes;
};
