import mongoose, { Schema, Document } from "mongoose";
import { Order as OrderInterface } from "./order.interface";

const orderSchema: Schema = new Schema({
  userId: { type: Number, required: true },
  orders: [
    {
      productName: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true },
    },
  ],
});

export default mongoose.model<OrderInterface & Document>("Order", orderSchema);
