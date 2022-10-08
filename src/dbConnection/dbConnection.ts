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
      console.log("Connected to db");
    })
    .catch((e: any) => {
      console.log("Error connecting with db");
      console.log(e);

      logger.log({
        level: "error",
        message: `Unable to connect with db: ${e.stack}`,
        e,
        service: "server",
      });
    });
};
