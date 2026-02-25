import { prisma } from "@config/db";
import { NotificationType } from "@prisma/client";
import { buildMessage } from "./notification.utils";

/* ============================
   CREATE NOTIFICATION
============================ */

export async function createNotification(params: {
  userId: string;
  type: NotificationType;
  postId?: string;
  commentId?: string;
  actorProfileId?: string;
  meta?: any;
}) {
  return prisma.notification.create({
    data: {
      userId: params.userId,
      type: params.type,
      postId: params.postId,
      commentId: params.commentId,
      actorProfileId: params.actorProfileId,
      meta: params.meta,
    },
  });
}

/* ============================
   GET MY NOTIFICATIONS
============================ */

export async function getMyNotifications(
  userId: string,
  limit: number
) {
  const items = await prisma.notification.findMany({
    where: { userId },

    orderBy: { createdAt: "desc" },

    take: limit,

    include: {
      actorProfile: {
        select: { username: true },
      },
    },
  });

  return items.map((n) => ({
    id: n.id,
    type: n.type,

    message: buildMessage(
      n.type,
      n.actorProfile?.username
    ),

    postId: n.postId,
    commentId: n.commentId,

    isRead: n.isRead,
    createdAt: n.createdAt,
  }));
}

/* ============================
   MARK AS READ
============================ */

export async function markAsRead(
  notificationId: string,
  userId: string
) {
  return prisma.notification.updateMany({
    where: {
      id: notificationId,
      userId,
    },

    data: {
      isRead: true,
    },
  });
}

/* ============================
   MARK ALL AS READ
============================ */

export async function markAllRead(userId: string) {
  return prisma.notification.updateMany({
    where: {
      userId,
      isRead: false,
    },

    data: {
      isRead: true,
    },
  });
}

/* ============================
   UNREAD COUNT
============================ */

export async function getUnreadCount(userId: string) {
  return prisma.notification.count({
    where: {
      userId,
      isRead: false,
    },
  });
}