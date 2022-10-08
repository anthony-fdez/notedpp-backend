/* eslint-disable @typescript-eslint/no-explicit-any */
import { logger } from "./logger/logger";
import app from "./app";

import { prisma } from "../prisma/prisma-client";

const PORT = process.env.PORT || 3001;

export const server = app.listen(PORT, async () => {
  try {
    await prisma.$connect();

    console.log(`PORT: ${PORT}`);
  } catch (error: any) {
    logger.log({
      level: "error",
      message: `Unable to connect with db`,
      error,
      service: "server",
    });
  }

  process.on("unhandledRejection", (err: Error) => {
    logger.log({
      level: "error",
      message: `server shutting down due to unhandled rejection: ${err.stack}`,
      error: err,
      service: "server",
    });

    server.close(async () => {
      await prisma.$disconnect();
      process.exit(1);
    });
  });
});
