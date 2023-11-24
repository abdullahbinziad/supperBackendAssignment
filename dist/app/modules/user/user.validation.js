"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const userValidationSchema = zod_1.z.object({
    userId: zod_1.z
        .number()
        .int()
        .refine((value) => Number.isInteger(value), {
        message: "User ID must be an integer",
    }),
    username: zod_1.z.string().refine((value) => value.trim().length > 0, {
        message: "Username is required",
    }),
    password: zod_1.z.string().refine((value) => value.trim().length > 0, {
        message: "Password is required",
    }),
    fullName: zod_1.z.object({
        firstName: zod_1.z.string().refine((value) => value.trim().length > 0, {
            message: "First name is required",
        }),
        lastName: zod_1.z.string().refine((value) => value.trim().length > 0, {
            message: "Last name is required",
        }),
    }),
    age: zod_1.z.number().int().optional(),
    email: zod_1.z.string().email({
        message: "Invalid email format",
    }),
    isActive: zod_1.z.boolean(),
    hobbies: zod_1.z.array(zod_1.z.string()).optional(),
    address: zod_1.z.object({
        street: zod_1.z.string().refine((value) => value.trim().length > 0, {
            message: "Street is required",
        }),
        city: zod_1.z.string().refine((value) => value.trim().length > 0, {
            message: "City is required",
        }),
        country: zod_1.z.string().refine((value) => value.trim().length > 0, {
            message: "Country is required",
        }),
    }),
    orders: zod_1.z
        .array(zod_1.z.object({
        productName: zod_1.z.string().refine((value) => value.trim().length > 0, {
            message: "Product name is required",
        }),
        price: zod_1.z.number().positive({
            message: "Price must be a positive number",
        }),
        quantity: zod_1.z.number().int().positive({
            message: "Quantity must be a positive integer",
        }),
    }))
        .optional(),
});
exports.default = userValidationSchema;
