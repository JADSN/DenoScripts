export interface UserLogin {
  email: string;
  password: string;
}

export interface UserAuth {
  email: string;
  token: string;
  username: string;
  bio: string;
  image: string;
}

export interface UserRegistration {
  username: string;
  email: string;
  password: string;
}

export interface Profile {
  username: string;
  bio: string;
  image: string;
  following: boolean;
}

export interface Author {
  id: number;
  username: string;
  bio: string;
  image: string;
  following: boolean;
}

export interface Article {
  slug: string;
  title: string;
  description: string;
  body: string;
  tagList: string[];
  createdAt: Date;
  updatedAt: Date;
  favorited: boolean;
  favoritesCount: number;
  author: Author;
  articlesCount?: number;
}

export interface Comment {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  body: string;
  author: Author;
}

export interface Tag {
  tags: string[];
}

// TODO: How to make id obligated
export interface App {
  // id: number;
  name: string;
  version: string;
}
