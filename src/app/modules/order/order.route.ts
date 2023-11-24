import express from "express";
import * as OrderController from "./order.controller";

const router = express.Router();

router.post("/create-order", OrderController.createOrder);
router.get("/", OrderController.getAllOrders);
router.get("/:id", OrderController.getSingleOrder);

export const OrderRoute = router;
