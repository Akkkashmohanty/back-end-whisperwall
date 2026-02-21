import { prisma } from "@config/db";
import { LikeResponse } from "./like.types";

export async function toggleLike(
  postId: string,
  profileId: string
): Promise<LikeResponse> {
  const existing = await prisma.postLike.findUnique({
    where: {
      postId_profileId: {
        postId,
        profileId,
      },
    },
  });

  if (existing) {
    // Unlike
    await prisma.postLike.delete({
      where: { id: existing.id },
    });
  } else {
    // Like
    await prisma.postLike.create({
      data: {
        postId,
        profileId,
      },
    });
  }

  const count = await prisma.postLike.count({
    where: { postId },
  });

  return {
    postId,
    liked: !existing,
    likeCount: count,
  };
}

export async function getLikeStatus(
  postId: string,
  profileId: string
) {
  const [liked, count] = await Promise.all([
    prisma.postLike.findUnique({
      where: {
        postId_profileId: {
          postId,
          profileId,
        },
      },
    }),
    prisma.postLike.count({
      where: { postId },
    }),
  ]);

  return {
    postId,
    liked: Boolean(liked),
    likeCount: count,
  };
}