import { Request, Response } from "express";
import * as UserService from "./user.service";
import bcrypt from "bcrypt";
import userValidationSchema from "./user.validation";

export const createUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body;
    // Hash the password securely before storing it in the database
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    userData.password = hashedPassword;

    const validateData = await userValidationSchema.parse(userData);

    const user = await UserService.createUserInDB(validateData);

    const { password, ...userWithoutPassword } = user.toObject();

    res.status(200).json({
      success: true,
      message: "User created successfully",
      data: userWithoutPassword,
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to create user",
      error: error,
    });
  }
};

export const getAllUsers = async (_req: Request, res: Response) => {
  try {
    const users = await UserService.getAllUsersFromDB();

    const filteredUsers = users.map((user) => ({
      username: user.username,
      fullName: user.fullName,
      age: user.age,
      email: user.email,
      address: user.address,
    }));

    res.status(200).json({
      success: true,
      message: "Users retrieved successfully",
      data: filteredUsers,
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve users",
      error: error,
    });
  }
};

//interface for the single user data

export const getSingleUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const result = await UserService.getSingleUserFromDB(userId);

    // Transform the result into the desired format
    const formattedUser = {
      userId: result?.userId,
      username: result?.username,
      fullName: result?.fullName,
      age: result?.age,
      email: result?.email,
      isActive: result?.isActive,
      hobbies: result?.hobbies,
      address: result?.address,
    };

    res.status(200).json({
      success: true,
      message: "User retrieved successfully",
      data: formattedUser,
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve user",
      error: error.message,
    });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const userId: any = req.params.userId; // Extracting user ID from URL params
    const userDataToUpdate = req.body; // New user data to update

    const result = await UserService.updateUserInDB(userId, userDataToUpdate);

    const formattedUser = {
      userId: result?.userId,
      username: result?.username,
      fullName: result?.fullName,
      age: result?.age,
      email: result?.email,
      isActive: result?.isActive,
      hobbies: result?.hobbies,
      address: result?.address,
    };

    if (result) {
      res.status(200).json({
        success: true,
        message: "User updated successfully",
        data: formattedUser,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "User not found or update failed",
      });
    }
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to update user",
      error: error.message,
    });
  }
};

//delete

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const deletionResult = await UserService.deleteUserFromDB(userId);

    if (deletionResult) {
      res.status(200).json({
        success: true,
        message: "User deleted successfully",
        data: null,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "User not found or could not be deleted",
      });
    }
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to delete user",
      error: error.message,
    });
  }
};

//put orders in specific user

export const addOrderinUser = async (req: Request, res: Response) => {
  try {
    const userId: any = req.params.userId; // Extracting user ID from URL params
    const userDataToUpdate = req.body; // New user data to update

    const result = await UserService.addProductsInUserDB(
      userId,
      userDataToUpdate
    );

    if (result) {
      res.status(200).json({
        success: true,
        message: "Products Added successfully",
        data: null,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "User not found or update failed",
      });
    }
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to update user",
      error: error.message,
    });
  }
};
