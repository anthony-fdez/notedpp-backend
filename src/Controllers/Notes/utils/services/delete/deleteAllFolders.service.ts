import { prisma } from "../../../../../../prisma/prisma-client";

interface Props {
  user_id: string;
}

export const deleteAllFolders = async ({ user_id }: Props) => {
  const deletedFolders = await prisma.folder.deleteMany({
    where: {
      user_id,
    },
  });

  return deletedFolders;
};
