import { logger } from "./logger/logger";
import app from "./app";
import http from "http";
import { Server } from "socket.io";

import { prisma } from "../prisma/prisma-client";

const PORT = process.env.PORT || 3001;
const server = http.createServer(app);
export const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

require("./chat/chat");

server.listen(PORT, async () => {
  try {
    await prisma.$connect();

    require("./chat/chat");

    logger.log({
      level: "info",
      message: `App running on port: ${PORT}`,
    });
  } catch (error: any) {
    logger.log({
      level: "error",
      message: "Unable to connect with db",
      error,
      service: "server",
    });
  }

  process.on("unhandledRejection", (err: Error) => {
    logger.log({
      level: "error",
      message: "Server shutting down due to unhandled rejection",
      error: err,
      service: "server",
    });

    server.close(async () => {
      await prisma.$disconnect();
      process.exit(1);
    });
  });
});
