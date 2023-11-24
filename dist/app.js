"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const user_route_1 = require("./app/modules/user/user.route");
const order_route_1 = require("./app/modules/order/order.route");
const app = (0, express_1.default)();
//parsers
app.use(express_1.default.json());
app.use((0, cors_1.default)());
//application routes
app.use("/api/users", user_route_1.UserRoutes);
app.use("/api/orders", order_route_1.OrderRoute);
const getAController = (req, res) => {
    const a = 10;
    res.send(a);
};
app.get("/", getAController);
exports.default = app;
