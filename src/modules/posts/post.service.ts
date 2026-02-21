import { prisma } from "@config/db";
import { PostResponse } from "./post.types";

/* ============================
   CREATE POST
============================ */

export async function createPost(
  profileId: string,
  college: string,
  content: string
): Promise<PostResponse> {
  return prisma.post.create({
    data: {
      content,
      college,
      authorProfileId: profileId,
    },

    select: {
      id: true,
      content: true,
      college: true,
      createdAt: true,

      
      _count: {
        select: {
          likes: true,
        },
      },
    },
  });
}

/* ============================
   HOME FEED
============================ */

export async function getHomeFeed(
  college: string,
  limit: number
): Promise<PostResponse[]> {
  return prisma.post.findMany({
    where: {
      college,
      visibility: "VISIBLE",
    },

    orderBy: { createdAt: "desc" },
    take: limit,

    select: {
      id: true,
      content: true,
      college: true,
      createdAt: true,

      
      _count: {
        select: {
          likes: true,
        },
      },
    },
  });
}

/* ============================
   FOR YOU FEED
============================ */

export async function getForYouFeed(
  limit: number
): Promise<PostResponse[]> {
  return prisma.post.findMany({
    where: {
      visibility: "VISIBLE",
    },

    orderBy: { createdAt: "desc" },
    take: limit,

    select: {
      id: true,
      content: true,
      college: true,
      createdAt: true,

      
      _count: {
        select: {
          likes: true,
        },
      },
    },
  });
}

/* ============================
   COLLEGE FEED
============================ */

export async function getCollegeFeed(
  college: string,
  limit: number
): Promise<PostResponse[]> {
  return prisma.post.findMany({
    where: {
      college,
      visibility: "VISIBLE",
    },

    orderBy: { createdAt: "desc" },
    take: limit,

    select: {
      id: true,
      content: true,
      college: true,
      createdAt: true,

      
      _count: {
        select: {
          likes: true,
        },
      },
    },
  });
}