import { prisma } from "@config/db";

export async function approveVerification(userId: string, adminId: string) {
  return prisma.$transaction([
    prisma.verificationRequest.update({
      where: { userId },
      data: {
        status: "APPROVED",
        reviewedByAdminId: adminId,   //FIX HERE
        reviewedAt: new Date(),
      },
    }),
    prisma.user.update({
      where: { id: userId },
      data: { status: "ACTIVE" },
    }),
  ]);
}

export async function rejectVerification(userId: string, adminId: string) {
  return prisma.$transaction([
    prisma.verificationRequest.update({
      where: { userId },
      data: {
        status: "REJECTED",
        reviewedByAdminId: adminId,   //FIX HERE
        reviewedAt: new Date(),
      },
    }),
    prisma.user.update({
      where: { id: userId },
      data: { status: "REJECTED" },
    }),
  ]);
}
