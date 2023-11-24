import UserModel from "./user.model";
import { User } from "./user.interface";

export const createUserInDB = async (user: User) => UserModel.create(user);

export const getAllUsersFromDB = async () => UserModel.find();

export const getSingleUserFromDB = async (id: any) =>
  UserModel.findOne({ userId: id });

export const updateUserInDB = async (
  userId: number,
  updatedUserData: Partial<User>
) => UserModel.findOneAndUpdate({ userId }, updatedUserData, { new: true });

export const addProductsInUserDB = async (
  userId: number,
  updatedUserData: Partial<User>
) => {
  const user = await UserModel.findOne({ userId });

  if (!user) {
    return null;
  }

  const { productName, price, quantity }: any = updatedUserData;
  const newOrder = { productName, price, quantity };

  if (!user.orders) {
    user.orders = [];
  }

  user.orders.push(newOrder);
  const updatedUser = await user.save();

  return updatedUser;
};

export const deleteUserFromDB = async (id: any) =>
  UserModel.findOneAndDelete({ userId: id });

export const getAllOrdersFromUser = async (userId: number) => {
  const userWithOrders = await UserModel.findOne({ userId }).populate("orders");
  return userWithOrders?.orders || null;
};

export const getAllOrdersTotalPrice = async (userId: number) => {
  const userWithOrders = await UserModel.findOne({ userId }).populate("orders");
  const orders = userWithOrders?.orders || [];

  let totalPrice = 0;

  orders.forEach((order) => {
    const subtotal = order.price * order.quantity;
    totalPrice += subtotal;
  });

  return totalPrice;
};
