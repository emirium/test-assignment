import { z } from "zod";

export const postSchema = z.object({
  id: z.number().optional(),
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title must be less than 100 characters"),
  body: z
    .string()
    .min(1, "Body is required")
    .max(1000, "Body must be less than 1000 characters"),
  userId: z.number().min(1, "User ID is required"),
});

export type Post = z.infer<typeof postSchema>;

export interface Comment {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}

export interface PostState {
  posts: Post[];
  selectedPost: Post | null;
  loading: boolean;
  error: string | null;
  totalPosts: number;
  currentPage: number;
  postsPerPage: number;
}

export type PostFormData = Omit<Post, "id">;
