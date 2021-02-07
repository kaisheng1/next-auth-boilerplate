import { PrismaClient } from "@prisma/client";
import { Permission } from "./makePermissions";

const prisma = new PrismaClient();

export const IS_ADMIN: Permission = async (session) => {
  const user = await prisma.user.findFirst({
    where: { ...session.user },
  });
  return !!user && user.isAdmin;
};
