import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  timestamp: { type: Date, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  thumbnail: { type: String, required: true }
});

export const productModel = mongoose.model("Product", productSchema);