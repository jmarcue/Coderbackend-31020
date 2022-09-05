import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  message : {
    user: { type: String },
    mensaje: { type: String }
  }
})

export const messageModel = mongoose.model("message", messageSchema, "message");