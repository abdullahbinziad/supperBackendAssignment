import express from "express";
import * as UserController from "./user.controller";

const router = express.Router();

router.post("/", UserController.createUser); // Route for creating a users
router.get("/", UserController.getAllUsers); // Route for getting all users
router.get("/:userId", UserController.getSingleUser); // Route for getting a single user by userId
router.put("/:userId", UserController.updateUser); // Route for updating a user
router.delete("/:userId", UserController.deleteUser); // Route for delteing a user
router.put("/:userId/orders", UserController.addOrderinUser); // Route for add order in a user
router.get("/:userId/orders", UserController.getAllOrders); // Route for geeting all orders from a users
router.get("/:userId/orders/total-price", UserController.getAllOrdersPrice); // Route for calculate total orders price

export const UserRoutes = router;
