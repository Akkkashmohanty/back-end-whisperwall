import { prisma } from "@config/db";
import { calculateTrendingScore } from "./trending.utils";

function getWindowDate(window: string) {
  const now = new Date();

  if (window === "7d") {
    now.setDate(now.getDate() - 7);
  } else {
    // Default 24h
    now.setDate(now.getDate() - 1);
  }

  return now;
}

/* ============================
   GLOBAL TRENDING
============================ */

export async function getGlobalTrending(
  limit: number,
  window: string
) {
  const since = getWindowDate(window);

  const posts = await prisma.post.findMany({
    where: {
      visibility: "VISIBLE",
      createdAt: { gte: since },
    },

    include: {
      _count: {
        select: {
          likes: true,
          comments: true,
          reposts: true,
        },
      },
    },
  });

  return posts
    .map((p) => ({
      id: p.id,
      content: p.content,
      college: p.college,
      createdAt: p.createdAt,

      score: calculateTrendingScore(
        p._count.likes,
        p._count.comments,
        p._count.reposts,
        p.reportCount,
        p.createdAt
      ),

      _count: p._count,
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}

/* ============================
   COLLEGE TRENDING
============================ */

export async function getCollegeTrending(
  college: string,
  limit: number,
  window: string
) {
  const since = getWindowDate(window);

  const posts = await prisma.post.findMany({
    where: {
      college,
      visibility: "VISIBLE",
      createdAt: { gte: since },
    },

    include: {
      _count: {
        select: {
          likes: true,
          comments: true,
          reposts: true,
        },
      },
    },
  });

  return posts
    .map((p) => ({
      id: p.id,
      content: p.content,
      college: p.college,
      createdAt: p.createdAt,

      score: calculateTrendingScore(
        p._count.likes,
        p._count.comments,
        p._count.reposts,
        p.reportCount,
        p.createdAt
      ),

      _count: p._count,
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}