"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const userValidationSchema = zod_1.z.object({
    userId: zod_1.z.number().refine((value) => Number.isInteger(value), {
        message: "User ID must be an integer",
    }),
    username: zod_1.z.string().min(1, { message: "Username is required" }),
    password: zod_1.z.string().min(1, { message: "Password is required" }),
    fullName: zod_1.z
        .object({
        firstName: zod_1.z.string().min(1, { message: "First name is required" }),
        lastName: zod_1.z.string().min(1, { message: "Last name is required" }),
    })
        .refine((value) => !!value.firstName && !!value.lastName, {
        message: "Both first and last names are required",
    }),
    age: zod_1.z.number().int().optional(),
    email: zod_1.z.string().email({ message: "Invalid email format" }),
    isActive: zod_1.z.boolean().default(false),
    hobbies: zod_1.z.array(zod_1.z.string()).optional(),
    address: zod_1.z.object({
        street: zod_1.z.string().min(1, { message: "Street is required" }),
        city: zod_1.z.string().min(1, { message: "City is required" }),
        country: zod_1.z.string().min(1, { message: "Country is required" }),
    }),
});
exports.default = userValidationSchema;
