import { z } from "zod";

const userValidationSchema = z.object({
  userId: z.number().refine((value) => Number.isInteger(value), {
    message: "User ID must be an integer",
  }),
  username: z.string().min(1, { message: "Username is required" }),
  password: z.string().min(1, { message: "Password is required" }),
  fullName: z
    .object({
      firstName: z.string().min(1, { message: "First name is required" }),
      lastName: z.string().min(1, { message: "Last name is required" }),
    })
    .refine((value) => !!value.firstName && !!value.lastName, {
      message: "Both first and last names are required",
    }),
  age: z.number().int().optional(),
  email: z.string().email({ message: "Invalid email format" }),
  isActive: z.boolean().default(false),
  hobbies: z.array(z.string()).optional(),
  address: z.object({
    street: z.string().min(1, { message: "Street is required" }),
    city: z.string().min(1, { message: "City is required" }),
    country: z.string().min(1, { message: "Country is required" }),
  }),
});

export default userValidationSchema;
