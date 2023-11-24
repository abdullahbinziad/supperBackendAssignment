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
exports.getSingleOrderFromDB = exports.getAllOrdersFromDB = exports.createOrderInDB = void 0;
const order_model_1 = __importDefault(require("./order.model"));
const createOrderInDB = (order) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_model_1.default.create(order);
    return result;
});
exports.createOrderInDB = createOrderInDB;
const getAllOrdersFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_model_1.default.find();
    return result;
});
exports.getAllOrdersFromDB = getAllOrdersFromDB;
const getSingleOrderFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_model_1.default.findOne({ userId: id });
    return result;
});
exports.getSingleOrderFromDB = getSingleOrderFromDB;
