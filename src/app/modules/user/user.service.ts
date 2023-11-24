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
