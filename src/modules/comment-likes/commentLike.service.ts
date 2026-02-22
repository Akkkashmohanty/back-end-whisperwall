import { prisma } from "@config/db";
import { CommentLikeResponse } from "./commentLike.types";

/* ============================
   TOGGLE LIKE / UNLIKE
============================ */

export async function toggleCommentLike(
  commentId: string,
  profileId: string
): Promise<CommentLikeResponse> {
  const existing = await prisma.commentLike.findUnique({
    where: {
      commentId_profileId: {
        commentId,
        profileId,
      },
    },
  });

  if (existing) {
    // Unlike
    await prisma.commentLike.delete({
      where: { id: existing.id },
    });
  } else {
    // Like
    await prisma.commentLike.create({
      data: {
        commentId,
        profileId,
      },
    });
  }

  const count = await prisma.commentLike.count({
    where: { commentId },
  });

  return {
    commentId,
    liked: !existing,
    likeCount: count,
  };
}

/* ============================
   GET STATUS
============================ */

export async function getCommentLikeStatus(
  commentId: string,
  profileId: string
) {
  const [liked, count] = await Promise.all([
    prisma.commentLike.findUnique({
      where: {
        commentId_profileId: {
          commentId,
          profileId,
        },
      },
    }),

    prisma.commentLike.count({
      where: { commentId },
    }),
  ]);

  return {
    commentId,
    liked: Boolean(liked),
    likeCount: count,
  };
}