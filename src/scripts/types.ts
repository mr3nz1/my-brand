export type Message = {
  content: string;
  created_at: string;
  email: string;
  fullName: string;
  id?: string;
  articleId?: string;
};

export type Article = {
  id: string;
  title: string;
  description: string;
  content: string;
  image: string;
  published: boolean;
  created_at?: string;
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
  created_at: string;
  email: string;
  fullName: string;
};
