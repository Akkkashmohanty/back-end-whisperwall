export interface TrendingPost {
  id: string;
  content: string;
  college: string;
  createdAt: Date;
  score: number;

  _count: {
    likes: number;
    comments: number;
    reposts: number;
  };
}