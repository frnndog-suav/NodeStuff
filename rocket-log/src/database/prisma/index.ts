import { PrismaClient } from "./generated/client";

export const prisma = new PrismaClient({
  log: process.env.NODE_ENV === "production" ? [] : ["query"],
});
