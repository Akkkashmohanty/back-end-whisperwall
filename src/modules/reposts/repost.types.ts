export interface RepostResponse {
  id: string;
  content: string;
  createdAt: Date;

  originalPost: {
    id: string;
    content: string;
    college: string;
  };
}