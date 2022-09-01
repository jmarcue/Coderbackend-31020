import dotenv from 'dotenv';

dotenv.config();

export const serverEnv = {
  MONGO_ATLAS: process.env.MONGO_ATLAS || ""  
};