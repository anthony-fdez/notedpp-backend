import { prisma } from "../../../../../../prisma/prisma-client";

// * All this does is delete all the records that don't have a 'auth0' user
// * WHich means that it was made by a test

export const deleteAllTests = async () => {
  await prisma.folder.deleteMany({
    where: {
      NOT: {
        user_id: {
          startsWith: "auth0",
        },
      },
    },
  });

  await prisma.note.deleteMany({
    where: {
      NOT: {
        user_id: {
          startsWith: "auth0",
        },
      },
    },
  });
};
