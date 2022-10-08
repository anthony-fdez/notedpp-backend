/* eslint-disable @typescript-eslint/no-explicit-any */
import { logger } from "./logger/logger";
import app from "./app";
import { PrismaClient } from "@prisma/client";

const PORT = process.env.PORT || 3001;
const prisma = new PrismaClient();

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

    server.close(() => {
      process.exit(1);
    });
  });
});
