import { prisma } from "@config/db";
import { MyProfileResponse } from "./user.types";

export async function getMyProfile(userId: string): Promise<MyProfileResponse> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      profile: true,
    },
  });

  if (!user || !user.profile) {
    throw new Error("Profile not found");
  }

  return {
    username: user.profile.username,
    college: user.college,
    stream: user.stream,
    status: user.status,
    joinedAt: user.createdAt,
    plan: "FREE",
  };
}

export async function getMyPosts(profileId: string) {
  return prisma.post.findMany({
    where: {
      authorProfileId: profileId,
    },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      content: true,
      college: true,
      createdAt: true,
    },
  });
}
