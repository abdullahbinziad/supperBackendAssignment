import mongoose, { Schema, Document } from "mongoose";
import { User } from "./user.interface";

const userSchema: Schema = new Schema({
  userId: { type: Number, unique: true, required: true },
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  fullName: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
  },
  age: Number,
  email: { type: String, required: true },
  isActive: { type: Boolean, default: false },
  hobbies: [String],
  address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
  },
  orders: [
    {
      productName: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true },
    },
  ], // Include the orders field using the orderSchema
});

export default mongoose.model<User & Document>("User", userSchema);
