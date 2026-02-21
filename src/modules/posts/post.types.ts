export interface PostResponse {
  id: string;
  content: string;
  college: string;
  createdAt: Date;

  isRepost: boolean;

  originalPost?: {
    id: string;
    content: string;
    college: string;
    createdAt: Date;
  } | null;

  _count: {
    likes: number;
  };
}