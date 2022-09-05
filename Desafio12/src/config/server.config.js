import dotenv from 'dotenv';

dotenv.config();

export const serverConfig = {
  MONGO_ATLAS: process.env.MONGO_ATLAS || "",
  PORT: process.env.PORT || 8080
};