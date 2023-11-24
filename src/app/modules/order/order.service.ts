import OrderModel from "./order.model";
import { Order } from "./order.interface";

export const createOrderInDB = async (order: Order) => {
  const result = await OrderModel.create(order);
  return result;
};

export const getAllOrdersFromDB = async () => {
  const result = await OrderModel.find();
  return result;
};

export const getSingleOrderFromDB = async (id: any) => {
  const result = await OrderModel.findOne({ userId: id });
  return result;
};
