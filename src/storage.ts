import type { Post } from "./types";

const KEY = "miniblog_posts";

export function getLocalPosts(): Post[] {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]") as Post[];
  } catch {
    return [];
  }
}

export function addLocalPost(data: {
  title: string;
  body: string;
  author: string;
}): Post {
  const post: Post = {
    id: `local-${Date.now()}`,
    ...data,
    isLocal: true,
    createdAt: new Date().toISOString(),
  };
  localStorage.setItem(KEY, JSON.stringify([post, ...getLocalPosts()]));
  return post;
}
