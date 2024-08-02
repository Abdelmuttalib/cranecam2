import { env } from "@/env";
import bcrypt from "bcryptjs";

const SALT_ROUNDS = env.SALT_ROUNDS;

export function hashPassword(password: string) {
  return bcrypt.hashSync(password, SALT_ROUNDS);
}

export function comparePassword(inputPassword: string, sourcePassword: string) {
  const hashedInputPassword = hashPassword(inputPassword);
  return bcrypt.compare(hashedInputPassword, sourcePassword);
}
