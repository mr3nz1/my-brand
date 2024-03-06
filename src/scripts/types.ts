export type Message = {
  message: string;
  createdAt: string;
  email: string;
  name: string;
  id?: string;
  articleId?: string;
};

export type Article = {
  [key: string]: any;
  id: string;
  title: string;
  description: string;
  content: string;
  bannerImage: File | undefined;
  isPublished: boolean;
};

export type Task = {
  title: string;
  content: string;
  id: string;
  created_at: string;
};

export type Comment = {
  [key: string]: string;
  articleId: string;
  comment: string;
  email: string;
  name: string;
};
