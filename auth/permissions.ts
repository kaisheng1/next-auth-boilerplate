import { PrismaClient } from "@prisma/client";
import { Session } from "next-auth/client";

const prisma = new PrismaClient();

export type PermissionResult = {
  allowed: Boolean | Promise<Boolean>;
  errorMessage?: string;
};
export type Permission = (
  session: Session
) => PermissionResult | Promise<PermissionResult>;

export const IS_ADMIN: Permission = async (session) => {
  const user = await prisma.user.findFirst({
    where: { ...session.user },
  });
  return {
    allowed: !!user && user.isAdmin,
    errorMessage: `${session.user.name} is not admin!`,
  };
};
