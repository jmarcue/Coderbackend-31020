import mongoose from "mongoose";
import { serverConfig } from "./server.config.js";

const mongoOptions = { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true };

const mongoConnect = mongoose.connect(serverConfig.MONGO_ATLAS, mongoOptions);

export { mongoConnect }