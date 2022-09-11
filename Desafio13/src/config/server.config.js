import dotenv from 'dotenv';

dotenv.config();

export const serverConfig = {
  MONGO_ATLAS: process.env.MONGO_ATLAS || "",
  MONGO_LOCAL: process.env.MONGO_LOCAL || "",
  PORT: process.env.PORT || 8080
};