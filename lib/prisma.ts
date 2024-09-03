// prisma.ts
import { PrismaClient } from "@prisma/client";

// Declare a global variable for the Prisma client to use in a serverless environment
declare global {
  var prisma: PrismaClient | undefined;
}

// Check if there is already an instance of PrismaClient; if not, create a new one
const prisma = global.prisma || new PrismaClient();

// If we are in a development environment, attach the prisma instance to the global object
// This prevents the issue of having multiple PrismaClient instances in development mode
if (process.env.NODE_ENV !== "production") global.prisma = prisma;

export default prisma;
