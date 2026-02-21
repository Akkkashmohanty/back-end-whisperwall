import { prisma } from "@config/db";
import { CommentResponse } from "./comment.types";

const AUTO_HIDE_THRESHOLD = 3;

export async function createComment(
  profileId: string,
  postId: string,
  content: string,
  parentId?: string
): Promise<CommentResponse> {
  const comment = await prisma.comment.create({
    data: {
      content,
      postId,
      authorProfileId: profileId,
      parentId,
    },
    include: {
      authorProfile: {
        select: { username: true },
      },
    },
  });

  return {
    id: comment.id,
    content: comment.content,
    createdAt: comment.createdAt,
    authorUsername: comment.authorProfile.username,
    parentId: comment.parentId,
  };
}

export async function getCommentsForPost(
  postId: string,
  limit: number,
  cursor?: string
) {
  const comments = await prisma.comment.findMany({
    where: {
      postId,
      visibility: "VISIBLE",
      parentId: null,
    },
    take: limit,
    skip: cursor ? 1 : 0,
    cursor: cursor ? { id: cursor } : undefined,
    orderBy: { createdAt: "desc" },
    include: {
      authorProfile: {
        select: { username: true },
      },
      replies: {
        where: { visibility: "VISIBLE" },
        include: {
          authorProfile: { select: { username: true } },
        },
        orderBy: { createdAt: "asc" },
      },
    },
  });

  return comments.map((c) => ({
    id: c.id,
    content: c.content,
    createdAt: c.createdAt,
    authorUsername: c.authorProfile.username,
    parentId: c.parentId,
    replies: c.replies.map((r) => ({
      id: r.id,
      content: r.content,
      createdAt: r.createdAt,
      authorUsername: r.authorProfile.username,
      parentId: r.parentId,
    })),
  }));
}

export async function reportComment(
  commentId: string,
  reporterProfileId: string,
  reason: string
) {
  await prisma.commentReport.create({
    data: {
      commentId,
      reporterId: reporterProfileId,
      reason,
    },
  });

  const updated = await prisma.comment.update({
    where: { id: commentId },
    data: {
      reportCount: { increment: 1 },
    },
  });

  if (updated.reportCount + 1 >= AUTO_HIDE_THRESHOLD) {
    await prisma.comment.update({
      where: { id: commentId },
      data: { visibility: "HIDDEN" },
    });
  }
}