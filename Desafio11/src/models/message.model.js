import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    mail: { type: String },
    date: { type: String },
    message: { type: String }
});

export const messageModel = mongoose.model("Message", messageSchema, "message");