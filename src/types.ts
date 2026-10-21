export interface Post {
  id: number | string;
  userId?: number;
  title: string;
  body: string;
  author?: string;
  isLocal?: boolean;
  createdAt?: string;
}

export interface Comment {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}
