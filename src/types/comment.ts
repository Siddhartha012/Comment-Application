export interface Author {
  name: string;
  email: string;
  image?: string;
}

export interface Comment {
  id: string;
  content: string;
  parentId?: string | null;
  authorId: string;
  createdAt: string;
  updatedAt: string;
  author: Author;
  replies?: Comment[];
}
