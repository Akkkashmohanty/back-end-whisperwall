import { prisma } from "@config/db";

export async function reportPost(
  postId: string,
  reporterProfileId: string,
  reason: string
) {
  // Prevent duplicate reports
  await prisma.report.create({
    data: {
      postId,
      reporterId: reporterProfileId,
      reason,
    },
  });

  // Increment report count
  const post = await prisma.post.update({
    where: { id: postId },
    data: {
      reportCount: { increment: 1 },
    },
  });

  // Auto-hide if threshold reached
  if (post.reportCount + 1 >= 3) {
    await prisma.post.update({
      where: { id: postId },
      data: { visibility: "HIDDEN" },
    });
  }
}
