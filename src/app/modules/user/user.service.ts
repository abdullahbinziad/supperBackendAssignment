import UserModel from "./user.model";
import { User } from "./user.interface";

export const createUserInDB = async (user: User) => {
  const result = await UserModel.create(user);
  return result;
};

export const getAllUsersFromDB = async () => {
  const result = await UserModel.find();
  return result;
};

export const getSingleUserFromDB = async (id: any) => {
  const result = await UserModel.findOne({ userId: id });
  return result;
};

export const updateUserInDB = async (
  userId: number,
  updatedUserData: Partial<User>
) => {
  const result = await UserModel.findOneAndUpdate({ userId }, updatedUserData, {
    new: true,
  });
  return result;
};

export const addProductsInUserDB = async (
  userId: number,
  updatedUserData: Partial<User>
) => {
  try {
    // Find the user by userId
    const user = await UserModel.findOne({ userId });

    if (!user) {
      // Handle case where user is not found
      return null;
    }

    const { productName, price, quantity }: any = updatedUserData;

    const newOrder = {
      productName,
      price,
      quantity,
    };
    // Check if user has orders array, if not create it
    if (!user.orders) {
      user.orders = [];
    }

    // Add the new product to the orders array
    user.orders.push(newOrder);

    // Save the updated user document
    const updatedUser = await user.save();

    return updatedUser;
  } catch (error) {
    // Handle any errors that occur during the update process
    console.error(error);
    throw new Error("Failed to add product to user orders");
  }
};

export const deleteUserFromDB = async (id: any) => {
  const deletedUser = await UserModel.findOneAndDelete({ userId: id });
  return deletedUser;
};
