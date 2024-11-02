import http from "redaxios";

import type { Post, Comment } from "@/types/post.types";

const BASE_URL = "https://jsonplaceholder.typicode.com";

export const postsApi = {
  async getAllPosts(
    page: number = 1,
    limit: number = 10,
  ): Promise<{ posts: Post[]; total: number }> {
    const response = await http.get<Post[]>(`${BASE_URL}/posts`, {
      params: {
        _page: page,
        _limit: limit,
      },
    });
    return {
      posts: response.data,
      total: Number(response.headers.get("x-total-count") || 0),
    };
  },

  async getPost(id: number): Promise<Post> {
    const response = await http.get<Post>(`${BASE_URL}/posts/${id}`);
    return response.data;
  },

  async getPostComments(id: number): Promise<Comment[]> {
    const response = await http.get<Comment[]>(
      `${BASE_URL}/posts/${id}/comments`,
    );
    return response.data;
  },

  async createPost(post: Omit<Post, "id">): Promise<Post> {
    const response = await http.post<Post>(`${BASE_URL}/posts`, post);
    return response.data;
  },

  async updatePost(id: number, post: Partial<Post>): Promise<Post> {
    const response = await http.put<Post>(`${BASE_URL}/posts/${id}`, post);
    return response.data;
  },

  async patchPost(id: number, post: Partial<Post>): Promise<Post> {
    const response = await http.patch<Post>(`${BASE_URL}/posts/${id}`, post);
    return response.data;
  },

  async deletePost(id: number): Promise<void> {
    await http.delete(`${BASE_URL}/posts/${id}`);
  },
};
