import { z } from "zod";
import { loginFormSchema, registerFormSchema } from "./";

export type LoginFormFields = z.infer<typeof loginFormSchema>;

export type RegisterFormFields = z.infer<typeof registerFormSchema>;
