"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const UserController = __importStar(require("./user.controller"));
const router = express_1.default.Router();
router.post("/", UserController.createUser); // Route for creating a users
router.get("/", UserController.getAllUsers); // Route for getting all users
router.get("/:userId", UserController.getSingleUser); // Route for getting a single user by userId
router.put("/:userId", UserController.updateUser); // Route for updating a user
router.delete("/:userId", UserController.deleteUser); // Route for delteing a user
router.put("/:userId/orders", UserController.addOrderinUser); // Route for add order in a user
router.get("/:userId/orders", UserController.getAllOrders); // Route for geeting all orders from a users
router.get("/:userId/orders/total-price", UserController.getAllOrdersPrice); // Route for calculate total orders price
exports.UserRoutes = router;
