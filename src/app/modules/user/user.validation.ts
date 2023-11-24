import { string, z } from "zod";

const userValidationSchema = z.object({
  userId: z
    .number()
    .int()
    .refine((value) => Number.isInteger(value), {
      message: "User ID must be an integer",
    }),
  username: z.string().refine((value) => value.trim().length > 0, {
    message: "Username is required",
  }),
  password: z.string().refine((value) => value.trim().length > 0, {
    message: "Password is required",
  }),
  fullName: z.object({
    firstName: z.string().refine((value) => value.trim().length > 0, {
      message: "First name is required",
    }),
    lastName: z.string().refine((value) => value.trim().length > 0, {
      message: "Last name is required",
    }),
  }),
  age: z.number().int().optional(),
  email: z.string().email({
    message: "Invalid email format",
  }),
  isActive: z.boolean(),
  hobbies: z.array(z.string()).optional(),
  address: z.object({
    street: z.string().refine((value) => value.trim().length > 0, {
      message: "Street is required",
    }),
    city: z.string().refine((value) => value.trim().length > 0, {
      message: "City is required",
    }),
    country: z.string().refine((value) => value.trim().length > 0, {
      message: "Country is required",
    }),
  }),
  orders: z
    .array(
      z.object({
        productName: z.string().refine((value) => value.trim().length > 0, {
          message: "Product name is required",
        }),
        price: z.number().positive({
          message: "Price must be a positive number",
        }),
        quantity: z.number().int().positive({
          message: "Quantity must be a positive integer",
        }),
      })
    )
    .optional(),
});

export default userValidationSchema;
