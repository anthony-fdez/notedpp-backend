import { prisma } from "../../../../../../prisma/prisma-client";

interface Props {
  folder_name: string;
}

export const getFolder = async ({ folder_name }: Props) => {
  const folder = await prisma.folder.findUnique({
    where: {
      folder_name,
    },
  });

  return folder;
};
