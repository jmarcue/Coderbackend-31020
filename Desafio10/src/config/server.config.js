import { __dirname } from "../utils/helper.util.js";
import dotenv from 'dotenv';

dotenv.config();

export const serverEnvironment = {
  AUTH_KEY: process.env.AUTH_KEY || "admin",
  STORAGE: process.env.STORAGE || "mongo",
  MONGO_ATLAS: process.env.MONGO_ATLAS || ""  
};