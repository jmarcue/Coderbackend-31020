import mongoose from "mongoose";
import { serverEnv } from "../config/server.config.js";

const url = serverEnv.MONGO_ATLAS;
const mongoConfig = mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

export { mongoConfig }