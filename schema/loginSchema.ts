import { z } from "zod";


export const loginSchema = z.object({
  email: z.string()
    .min(1, "Email is required")
    .email("Invalid email address"),

  password: z.string()
    .min(1, "Password is required")
    .min(3, "Password must be at least 8 characters")
    // .regex(/[a-zA-Z]/, "Password must contain at least one letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
    // .regex(/[^a-zA-Z0-9]/, "Password must contain at least one special character"),

  rememberMe: z.boolean().optional(),
});

export type LoginFormData = z.infer<typeof loginSchema>;
