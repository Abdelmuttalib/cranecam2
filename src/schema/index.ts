import { z } from "zod";

export const loginFormSchema = z.object({
  email: z
    .string()
    .email({
      message: "invalid email address",
    })
    .min(4, {
      message: "email must be at least 4 characters",
    })
    .max(50, {
      message: "email must not be more than 50 characters",
    })
    .nonempty({
      message: "email is required",
    }),
  password: z
    .string()
    .min(8, { message: "password must be at least 8 characters" })
    .max(50, {
      message: "password must not be more than 50 characters",
    })
    .nonempty({
      message: "password is required",
    }),
});

export const registerFormSchema = z
  .object({
    email: z
      .string()
      .email({
        message: "invalid email address",
      })
      .min(4, {
        message: "email must be at least 4 characters",
      })
      .max(50, {
        message: "email must not be more than 50 characters",
      }),
    name: z
      .string()
      .min(1, {
        message: "name must be at least 1 characters",
      })
      .max(50, {
        message: "name must not be more than 50 characters",
      }),
    password: z
      .string()
      .min(8, { message: "password must be at least 8 characters" })
      .max(50, {
        message: "password must not be more than 50 characters",
      }),
    confirmPassword: z
      .string()
      .min(8, { message: "password must be at least 8 characters" })
      .max(50, {
        message: "password must not be more than 50 characters",
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "passwords do not match",
  });
