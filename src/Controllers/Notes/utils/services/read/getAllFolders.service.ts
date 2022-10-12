import { Folder } from "@prisma/client";
import { prisma } from "../../../../../../prisma/prisma-client";

interface Props {
  user_id: string;
}

export const getAllFolders = async ({ user_id }: Props): Promise<Folder[]> => {
  const folders: Folder[] = await prisma.folder.findMany({
    where: {
      user_id,
    },
  });

  return folders;
};
