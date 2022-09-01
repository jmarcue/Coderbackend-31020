import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    id: { 
      type: String,
      required: true
    },
    author: { 
      type: Object,
      required: true 
    },
    text: {
      type: Object,
      required: true 
    }}, 
  {
    versionKey: false }
);

export const messageModel = mongoose.model("Message", messageSchema);
