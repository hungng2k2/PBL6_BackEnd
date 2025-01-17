import dotenv from "dotenv";
import mongoose from "mongoose";
import app from "./app.js";
import logger from "./config/logger.js";
import userService from "./services/userService.js";
import generateData from "./utils/generateData.js";

dotenv.config();

const CONNECTION_URL = process.env.CONNECTION_URL;
const PORT = process.env.PORT || 3000;

async function main() {
  // connect database
  await mongoose.connect(CONNECTION_URL);
  logger.info("Connected to MongoDB");

  // init first admin
  const admin = await userService.initAdmin();

  // generate users
  // await generateData.generateUsers(2, 50);

  app.listen(PORT, () => {
    logger.info(`Listening to port ${PORT}`);
  });
}

main().catch((err) => logger.error(err));
