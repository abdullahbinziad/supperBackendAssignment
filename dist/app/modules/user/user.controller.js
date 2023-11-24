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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllOrdersPrice = exports.getAllOrders = exports.addOrderinUser = exports.deleteUser = exports.updateUser = exports.getSingleUser = exports.getAllUsers = exports.createUser = void 0;
const UserService = __importStar(require("./user.service"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_validation_1 = __importDefault(require("./user.validation"));
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userData = req.body;
        // Hash the password secure
        const hashedPassword = yield bcrypt_1.default.hash(userData.password, 10);
        userData.password = hashedPassword;
        const validateData = yield user_validation_1.default.parse(userData);
        const user = yield UserService.createUserInDB(validateData);
        const _a = user.toObject(), { password } = _a, userWithoutPassword = __rest(_a, ["password"]);
        res.status(200).json({
            success: true,
            message: "User created successfully",
            data: userWithoutPassword,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Failed to create user",
            error: error,
        });
    }
});
exports.createUser = createUser;
//get all users from Database
const getAllUsers = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield UserService.getAllUsersFromDB();
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
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Failed to retrieve users",
            error: error,
        });
    }
});
exports.getAllUsers = getAllUsers;
//get a single user from Database
const getSingleUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const result = yield UserService.getSingleUserFromDB(userId);
        const formattedUser = {
            userId: result === null || result === void 0 ? void 0 : result.userId,
            username: result === null || result === void 0 ? void 0 : result.username,
            fullName: result === null || result === void 0 ? void 0 : result.fullName,
            age: result === null || result === void 0 ? void 0 : result.age,
            email: result === null || result === void 0 ? void 0 : result.email,
            isActive: result === null || result === void 0 ? void 0 : result.isActive,
            hobbies: result === null || result === void 0 ? void 0 : result.hobbies,
            address: result === null || result === void 0 ? void 0 : result.address,
        };
        res.status(200).json({
            success: true,
            message: "User retrieved successfully",
            data: formattedUser,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Failed to retrieve user",
            error: error.message,
        });
    }
});
exports.getSingleUser = getSingleUser;
// update a single user
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const userDataToUpdate = req.body;
        const validateData = yield user_validation_1.default.parse(userDataToUpdate);
        const result = yield UserService.updateUserInDB(userId, validateData);
        const formattedUser = {
            userId: result === null || result === void 0 ? void 0 : result.userId,
            username: result === null || result === void 0 ? void 0 : result.username,
            fullName: result === null || result === void 0 ? void 0 : result.fullName,
            age: result === null || result === void 0 ? void 0 : result.age,
            email: result === null || result === void 0 ? void 0 : result.email,
            isActive: result === null || result === void 0 ? void 0 : result.isActive,
            hobbies: result === null || result === void 0 ? void 0 : result.hobbies,
            address: result === null || result === void 0 ? void 0 : result.address,
        };
        if (result) {
            res.status(200).json({
                success: true,
                message: "User updated successfully",
                data: formattedUser,
            });
        }
        else {
            res.status(404).json({
                success: false,
                message: "User not found or update failed",
            });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Failed to update user",
            error: error.message,
        });
    }
});
exports.updateUser = updateUser;
//delete a specific user from DB
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const deletionResult = yield UserService.deleteUserFromDB(userId);
        if (deletionResult) {
            res.status(200).json({
                success: true,
                message: "User deleted successfully",
                data: null,
            });
        }
        else {
            res.status(404).json({
                success: false,
                message: "User not found or could not be deleted",
            });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Failed to delete user",
            error: error.message,
        });
    }
});
exports.deleteUser = deleteUser;
//insert orders in specific user
const addOrderinUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const userDataToUpdate = req.body;
        const result = yield UserService.addProductsInUserDB(userId, userDataToUpdate);
        if (result) {
            res.status(200).json({
                success: true,
                message: "Order created successfully!",
                data: null,
            });
        }
        else {
            res.status(404).json({
                success: false,
                message: "User not found or update failed",
            });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Failed to update user",
            error: error.message,
        });
    }
});
exports.addOrderinUser = addOrderinUser;
//get all order from a specific users
const getAllOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const orders = yield UserService.getAllOrdersFromUser(userId);
        res.status(200).json({
            success: true,
            message: "Order fetched successfully!",
            data: {
                orders: orders,
            },
        });
    }
    catch (error) {
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
});
exports.getAllOrders = getAllOrders;
//get all price of all orders from a spcefic order
const getAllOrdersPrice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const totalPrice = yield UserService.getAllOrdersTotalPrice(userId);
        res.status(200).json({
            success: true,
            message: "Total Price fetching Sucessfully",
            data: {
                totalPrice: totalPrice,
            },
        });
    }
    catch (error) {
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
});
exports.getAllOrdersPrice = getAllOrdersPrice;
