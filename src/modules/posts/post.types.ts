export interface PostResponse {
  id: string;
  content: string;
  college: string;
  createdAt: Date;

  _count: {
    likes: number;
  };
}