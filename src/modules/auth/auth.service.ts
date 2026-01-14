import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "@config/db";
import crypto from "crypto";

const ACCESS_SECRET = process.env.JWT_SECRET!;
const REFRESH_SECRET = process.env.REFRESH_SECRET!;

export async function signup(data: any, idCardUrl?: string) {
  const existingUsername = await prisma.anonymousProfile.findUnique({
    where: { username: data.username },
  });
  if (existingUsername) throw new Error("Username already taken");

  if (!data.email && !idCardUrl) {
    throw new Error("College email or ID card is required");
  }

  const passwordHash = await bcrypt.hash(data.password, 10);

  const user = await prisma.user.create({
    data: {
      email: data.email,
      passwordHash,
      dob: data.dob,
      gender: data.gender,
      college: data.college,
      stream: data.stream,
      status: "PENDING",
      profile: {
        create: { username: data.username },
      },
      verification: {
        create: {
          type: data.email ? "COLLEGE_EMAIL" : "ID_CARD",
          collegeEmail: data.email ?? null,
          idCardImageUrl: idCardUrl ?? null,
          status: "PENDING",
        },
      },
    },
  });

  return { status: "PENDING", userId: user.id };
}

export async function login(username: string, password: string) {
  const profile = await prisma.anonymousProfile.findUnique({
    where: { username },
    include: { user: true },
  });
  if (!profile) throw new Error("Invalid credentials");

  if (profile.user.status !== "ACTIVE")
    throw new Error("Account not active");

  const ok = await bcrypt.compare(password, profile.user.passwordHash);
  if (!ok) throw new Error("Invalid credentials");

  const accessToken = jwt.sign(
    { uid: profile.user.id, aid: profile.id },
    ACCESS_SECRET,
    { expiresIn: "15m" }
  );
  const refreshToken = jwt.sign(
    { uid: profile.user.id },
    REFRESH_SECRET,
    { expiresIn: "7d" }
  );

  return { accessToken, refreshToken, username };
}

export async function requestPasswordReset(identifier: string) {
  const user = await prisma.user.findFirst({
    where: {
      OR: [
        { email: identifier },
        { profile: { username: identifier } },
      ],
    },
  });
  if (!user) return; // do not leak existence

  await prisma.passwordResetRequest.create({
    data: {
      userId: user.id,
      token: crypto.randomBytes(32).toString("hex"),
      status: "PENDING",
    },
  });
}

export async function resetPassword(token: string, newPassword: string) {
  const req = await prisma.passwordResetRequest.findUnique({
    where: { token },
    include: { user: true },
  });
  if (!req || req.status !== "APPROVED") {
    throw new Error("Invalid or expired token");
  }

  const hash = await bcrypt.hash(newPassword, 10);
  await prisma.$transaction([
    prisma.user.update({
      where: { id: req.userId },
      data: { passwordHash: hash },
    }),
    prisma.passwordResetRequest.update({
      where: { id: req.id },
      data: { status: "USED", usedAt: new Date() },
    }),
  ]);
}
