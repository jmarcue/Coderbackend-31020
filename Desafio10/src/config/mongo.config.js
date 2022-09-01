import mongoose from "mongoose";
import { serverEnvironment } from "../config/server.config.js";

const url = serverEnvironment.MONGO_ATLAS;
const mongoConfig = mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

export { mongoConfig }