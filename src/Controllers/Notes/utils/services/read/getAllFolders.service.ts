import { Folder } from "@prisma/client";
import { prisma } from "../../../../../../prisma/prisma-client";

interface Props {
  user_email: string;
}

export const getAllFolders = async ({
  user_email,
}: Props): Promise<Folder[]> => {
  const folders: Folder[] = await prisma.folder.findMany({
    where: {
      user_email,
    },
  });
  return folders;
};
