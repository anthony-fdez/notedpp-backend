import { logger } from "./../logger/logger";
const mongoose = require("mongoose");
require("dotenv").config();

export const dbConnection = () => {
  mongoose
    .connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      logger.log({
        level: "info",
        message: "Connected with db",
      });
    })
    .catch((e: any) => {
      logger.log({
        level: "error",
        message: `Unable to connect with db`,
        e,
        service: "server",
      });
    });
};
