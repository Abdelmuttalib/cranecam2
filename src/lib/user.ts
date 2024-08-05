import { User } from "@prisma/client";

export function getUserFullName(user: User | null) {
  if (!user) return "";
  return `${user.name}`;
}

export function getUserInitials(user: User) {
  if (!user) return "";
  if (!user.name) return "";

  return `${user.name[0]}`;
}
