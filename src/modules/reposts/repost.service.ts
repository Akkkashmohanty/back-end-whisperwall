import { prisma } from "@config/db";
import { RepostResponse } from "./repost.types";

export async function createRepost(
  profileId: string,
  postId: string,
  content: string,
  college: string
): Promise<RepostResponse> {

  // Ensure original post exists
  const original = await prisma.post.findUnique({
    where: { id: postId },
  });

  if (!original || original.visibility !== "VISIBLE") {
    throw new Error("Original post not available");
  }

  // Create quote repost
  const repost = await prisma.post.create({
    data: {
      content,
      college,
      authorProfileId: profileId,

      isRepost: true,
      originalPostId: postId,
    },

    include: {
      originalPost: {
        select: {
          id: true,
          content: true,
          college: true,
        },
      },
    },
  });

  return {
    id: repost.id,
    content: repost.content,
    createdAt: repost.createdAt,

    originalPost: repost.originalPost!,
  };
}