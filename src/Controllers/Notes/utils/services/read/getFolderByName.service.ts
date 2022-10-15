import { Folder } from "@prisma/client";
import { prisma } from "../../../../../../prisma/prisma-client";

interface Props {
  folder_name: string;
  user_id: string;
}

export const getFolderByName = async ({
  folder_name,
  user_id,
}: Props): Promise<Folder> => {
  const folder: Folder = (await prisma.folder.findFirst({
    where: {
      user_id,
      folder_name,
    },
  })) as Folder;

  return folder;
};
