"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllOrdersTotalPrice = exports.getAllOrdersFromUser = exports.deleteUserFromDB = exports.addProductsInUserDB = exports.updateUserInDB = exports.getSingleUserFromDB = exports.getAllUsersFromDB = exports.createUserInDB = void 0;
const user_model_1 = __importDefault(require("./user.model"));
const createUserInDB = (user) => __awaiter(void 0, void 0, void 0, function* () { return user_model_1.default.create(user); });
exports.createUserInDB = createUserInDB;
const getAllUsersFromDB = () => __awaiter(void 0, void 0, void 0, function* () { return user_model_1.default.find(); });
exports.getAllUsersFromDB = getAllUsersFromDB;
const getSingleUserFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () { return user_model_1.default.findOne({ userId: id }); });
exports.getSingleUserFromDB = getSingleUserFromDB;
const updateUserInDB = (userId, updatedUserData) => __awaiter(void 0, void 0, void 0, function* () { return user_model_1.default.findOneAndUpdate({ userId }, updatedUserData, { new: true }); });
exports.updateUserInDB = updateUserInDB;
const addProductsInUserDB = (userId, updatedUserData) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.findOne({ userId });
    if (!user) {
        return null;
    }
    const { productName, price, quantity } = updatedUserData;
    const newOrder = { productName, price, quantity };
    if (!user.orders) {
        user.orders = [];
    }
    user.orders.push(newOrder);
    const updatedUser = yield user.save();
    return updatedUser;
});
exports.addProductsInUserDB = addProductsInUserDB;
const deleteUserFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () { return user_model_1.default.findOneAndDelete({ userId: id }); });
exports.deleteUserFromDB = deleteUserFromDB;
const getAllOrdersFromUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const userWithOrders = yield user_model_1.default.findOne({ userId }).populate("orders");
    return (userWithOrders === null || userWithOrders === void 0 ? void 0 : userWithOrders.orders) || null;
});
exports.getAllOrdersFromUser = getAllOrdersFromUser;
const getAllOrdersTotalPrice = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const userWithOrders = yield user_model_1.default.findOne({ userId }).populate("orders");
    const orders = (userWithOrders === null || userWithOrders === void 0 ? void 0 : userWithOrders.orders) || [];
    let totalPrice = 0;
    orders.forEach((order) => {
        const subtotal = order.price * order.quantity;
        totalPrice += subtotal;
    });
    return totalPrice;
});
exports.getAllOrdersTotalPrice = getAllOrdersTotalPrice;
