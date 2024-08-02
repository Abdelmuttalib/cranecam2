import { User } from "@prisma/client";

export function getUserFullName(user: User | null) {
  if (!user) return "";
  return `${user.firstName} ${user.lastName}`;
}

export function getUserInitials(user: User) {
  if (!user) return "";
  if (!user.firstName || !user.lastName) return "";

  return `${user.firstName[0]}${user.lastName[0]}`;
}
