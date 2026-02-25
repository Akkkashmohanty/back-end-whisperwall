import { NotificationType } from "@prisma/client";

export function buildMessage(
  type: NotificationType,
  actor?: string
) {
  const name = actor || "Someone";

  switch (type) {
    case "POST_LIKED":
      return `${name} liked your post `;

    case "POST_COMMENTED":
      return `${name} commented on your post `;

    case "COMMENT_REPLIED":
      return `${name} replied to your comment ↩`;

    case "POST_REPOSTED":
      return `${name} reposted your post `;

    case "ACCOUNT_APPROVED":
      return `Your account has been approved `;

    case "PASSWORD_RESET_APPROVED":
      return `Password reset approved `;

    default:
      return "New notification";
  }
}
