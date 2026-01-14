import { prisma } from "@config/db";
import { approveVerification, rejectVerification } from "../verification/verification.service";
import crypto from "crypto";
import { sendResetEmail } from "@config/mail";

export async function getPendingUsers() {
  return prisma.verificationRequest.findMany({
    where: { status: "PENDING" },
    include: {
      user: {
        select: {
          id: true,
          email: true,
          college: true,
          stream: true,
          profile: { select: { username: true } },
        },
      },
    },
  });
}

export async function approveUser(userId: string, adminId: string) {
  await approveVerification(userId, adminId);
}

export async function rejectUser(userId: string, adminId: string) {
  await rejectVerification(userId, adminId);
}

export async function getResetRequests() {
  return prisma.passwordResetRequest.findMany({
    where: { status: "PENDING" },
    include: {
      user: {
        select: {
          email: true,
          profile: { select: { username: true } },
          college: true,
        },
      },
    },
  });
}

export async function approveReset(requestId: string) {
  const token = crypto.randomBytes(32).toString("hex");

  const req = await prisma.passwordResetRequest.update({
    where: { id: requestId },
    data: { status: "APPROVED", token },
    include: { user: true },
  });

  await sendResetEmail(req.user.email!, token);
}
