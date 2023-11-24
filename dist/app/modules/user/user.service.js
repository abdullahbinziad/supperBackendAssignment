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
exports.updateUserInDB = exports.getSingleUserFromDB = exports.getAllUsersFromDB = exports.createUserInDB = void 0;
const user_model_1 = __importDefault(require("./user.model"));
const createUserInDB = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.default.create(user);
    return result;
});
exports.createUserInDB = createUserInDB;
const getAllUsersFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.default.find();
    return result;
});
exports.getAllUsersFromDB = getAllUsersFromDB;
const getSingleUserFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.default.findOne({ userId: id });
    return result;
});
exports.getSingleUserFromDB = getSingleUserFromDB;
const updateUserInDB = (userId, updatedUserData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.default.findOneAndUpdate({ userId }, updatedUserData, {
        new: true,
    });
    return result;
});
exports.updateUserInDB = updateUserInDB;
