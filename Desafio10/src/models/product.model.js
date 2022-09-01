import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  timestamp: { type: Date, required: true },
  title: { type: String, required: true },
  code: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  thumbnail: { type: String, required: true }
});

export const productModel = mongoose.model("Product", productSchema);