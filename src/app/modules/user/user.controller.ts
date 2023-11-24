import { Request, Response } from "express";
import * as UserService from "./user.service";
import bcrypt from "bcrypt";
import userValidationSchema from "./user.validation";

export const createUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body;
    // Hash the password secure
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

//get all users from Database

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

//get a single user from Database

export const getSingleUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const result = await UserService.getSingleUserFromDB(userId);

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

// update a single user

export const updateUser = async (req: Request, res: Response) => {
  try {
    const userId: any = req.params.userId;
    const userDataToUpdate = req.body;

    const validateData = await userValidationSchema.parse(userDataToUpdate);

    const result = await UserService.updateUserInDB(userId, validateData);

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

//delete a specific user from DB

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

//insert orders in specific user

export const addOrderinUser = async (req: Request, res: Response) => {
  try {
    const userId: any = req.params.userId;
    const userDataToUpdate = req.body;

    const result = await UserService.addProductsInUserDB(
      userId,
      userDataToUpdate
    );

    if (result) {
      res.status(200).json({
        success: true,
        message: "Order created successfully!",
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

//get all order from a specific users
export const getAllOrders = async (req: Request, res: Response) => {
  try {
    const userId: any = req.params.userId;
    const orders = await UserService.getAllOrdersFromUser(userId);

    res.status(200).json({
      success: true,
      message: "Order fetched successfully!",
      data: {
        orders: orders,
      },
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "User not found",
      error: {
        code: 404,
        description: "User not found!",
      },
    });
  }
};

//get all price of all orders from a spcefic order
export const getAllOrdersPrice = async (req: Request, res: Response) => {
  try {
    const userId: any = req.params.userId;
    const totalPrice = await UserService.getAllOrdersTotalPrice(userId);

    res.status(200).json({
      success: true,
      message: "Total Price fetching Sucessfully",
      data: {
        totalPrice: totalPrice,
      },
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "User not found",
      error: {
        code: 404,
        description: "User not found!",
      },
    });
  }
};
