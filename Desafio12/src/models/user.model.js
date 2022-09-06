import mongoose from "mongoose";
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true }
});

userSchema.methods.encryptPassword = async password => {
  const salt =  await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

userSchema.methods.checkPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

export const userModel = mongoose.model("UserModel", productSchema, "user");