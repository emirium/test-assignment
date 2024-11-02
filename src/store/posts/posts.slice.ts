import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { postsApi } from "@/api/posts.api";

import type { Post, PostState } from "@/types/post.types";

const initialState: PostState = {
  posts: [],
  selectedPost: null,
  loading: false,
  error: null,
  totalPosts: 0,
  currentPage: 1,
  postsPerPage: 9,
};

export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async (
    { page, limit }: { page: number; limit: number },
    { rejectWithValue },
  ) => {
    try {
      return await postsApi.getAllPosts(page, limit);
    } catch (error) {
      return rejectWithValue("Failed to fetch posts");
    }
  },
);

export const fetchPostById = createAsyncThunk(
  "posts/fetchPostById",
  async (id: number, { rejectWithValue }) => {
    try {
      const post = await postsApi.getPost(id);
      return post;
    } catch (error) {
      return rejectWithValue("Failed to fetch post");
    }
  },
);

export const createPost = createAsyncThunk(
  "posts/createPost",
  async (post: Omit<Post, "id">, { rejectWithValue }) => {
    try {
      return await postsApi.createPost(post);
    } catch (error) {
      return rejectWithValue("Failed to create post");
    }
  },
);

export const updatePost = createAsyncThunk(
  "posts/updatePost",
  async (
    { id, post }: { id: number; post: Partial<Post> },
    { rejectWithValue },
  ) => {
    try {
      return await postsApi.updatePost(id, post);
    } catch (error) {
      return rejectWithValue("Failed to update post");
    }
  },
);

export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (id: number, { rejectWithValue }) => {
    try {
      await postsApi.deletePost(id);
      return id;
    } catch (error) {
      return rejectWithValue("Failed to delete post");
    }
  },
);

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setSelectedPost: (state, action: PayloadAction<Post | null>) => {
      state.selectedPost = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload.posts;
        state.totalPosts = action.payload.total;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchPostById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPostById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedPost = action.payload;
      })
      .addCase(fetchPostById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.posts.unshift(action.payload);
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        const index = state.posts.findIndex(
          (post) => post.id === action.payload.id,
        );
        if (index !== -1) {
          state.posts[index] = action.payload;
        }
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.posts = state.posts.filter((post) => post.id !== action.payload);
      });
  },
});

export const { setSelectedPost, setCurrentPage } = postsSlice.actions;
export default postsSlice.reducer;
