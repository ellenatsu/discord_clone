import { PrismaClient } from "@prisma/client";

declare global {
    var prisma: PrismaClient | undefined;
}

export const db = globalThis.prisma || new PrismaClient();

//avoid hot reload in development to generate too much clients.
if (process.env.NODE_ENV !== "production") {
    globalThis.prisma = db;
}