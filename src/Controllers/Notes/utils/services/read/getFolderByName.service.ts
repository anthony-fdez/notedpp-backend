import { Folder } from "@prisma/client";
import { prisma } from "../../../../../../prisma/prisma-client";

interface Props {
  folder_name: string;
}

export const getFolderByName = async ({
  folder_name,
}: Props): Promise<Folder> => {
  const folder: Folder = (await prisma.folder.findUnique({
    where: {
      folder_name,
    },
  })) as Folder;

  return folder;
};
