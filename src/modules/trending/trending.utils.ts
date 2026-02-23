export function calculateTrendingScore(
  likes: number,
  comments: number,
  reposts: number,
  reports: number,
  createdAt: Date
) {
  const hoursOld =
    (Date.now() - createdAt.getTime()) / (1000 * 60 * 60);

  return (
    likes * 3 +
    comments * 2 +
    reposts * 4 -
    reports * 5 -
    hoursOld * 0.5
  );
}