import express from "express";
import * as UserController from "./user.controller";

const router = express.Router();

router.post("/create-user", UserController.createUser);
router.get("/", UserController.getAllUsers);
router.get("/:userId", UserController.getSingleUser);
router.put("/:userId", UserController.updateUser); // Route for updating a user

export const UserRoutes = router;
