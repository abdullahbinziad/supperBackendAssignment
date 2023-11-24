import { Request, Response } from "express";
import * as OrderService from "./order.service";

export const createOrder = async (req: Request, res: Response) => {
  try {
    const orderData = req.body;
    const result = await OrderService.createOrderInDB(orderData);
    res.status(200).json({
      success: true,
      message: "Order created successfully",
      data: result,
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to create order",
      error: error.message,
    });
  }
};

export const getAllOrders = async (_req: Request, res: Response) => {
  try {
    const result = await OrderService.getAllOrdersFromDB();
    res.status(200).json({
      success: true,
      message: "Orders retrieved successfully",
      data: result,
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve orders",
      error: error.message,
    });
  }
};

export const getSingleOrder = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const result = await OrderService.getSingleOrderFromDB(userId);
    res.status(200).json({
      success: true,
      message: "Order retrieved successfully",
      data: result,
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve order",
      error: error.message,
    });
  }
};
