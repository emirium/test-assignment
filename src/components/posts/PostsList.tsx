import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";
import { useAppDispatch } from "@/hooks/use-app-dispatch";
import { useAppSelector } from "@/hooks/use-app-selector";
import { fetchPosts, deletePost } from "@/store/posts/posts.slice";
import { Button } from "@/components/ui/button";
import { Pagination } from "@/components/posts/Pagination";
import { Spinner } from "@/components/Spinner";

import type { Post } from "@/types/post.types";

export const PostsList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { posts, loading, error, currentPage, postsPerPage } = useAppSelector(
    (state) => state.posts,
  );

  useEffect(() => {
    dispatch(fetchPosts({ page: currentPage, limit: postsPerPage }));
  }, [dispatch, currentPage, postsPerPage]);

  const handleDelete = async (post: Post) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      await dispatch(deletePost(post.id!)).unwrap();
      dispatch(fetchPosts({ page: currentPage, limit: postsPerPage }));
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center p-4">
        <Spinner className="text-blue-500" />
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 p-4">{error}</div>;
  }

  return (
    <div>
      <div className="flex items-center gap-5 mb-4">
        <h2 className="text-xl text-blue-950 font-bold">Posts</h2>

        <Button asChild variant="outline">
          <Link to="/posts/new">+ Create new post</Link>
        </Button>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {posts.map((post) => (
          <div key={post.id} className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-2 first-letter:uppercase line-clamp-1 text-gray-800">
              {post.title}
            </h2>
            <p className="text-gray-400 text-sm font-medium line-clamp-3 first-letter:uppercase">
              {post.body}
            </p>
            <div className="flex items-center justify-end gap-2 mt-10">
              <Button
                asChild
                className="size-8 border-sky-200 text-sky-500 hover:bg-sky-400 hover:text-white"
                variant="outline"
              >
                <Link to={`/posts/${post.id}/edit`}>
                  <Pencil className="size-4" />
                </Link>
              </Button>
              <Button
                variant="outline"
                className="size-8 border-pink-100 text-pink-500 hover:bg-pink-400 hover:text-white"
                onClick={() => handleDelete(post)}
              >
                <Trash2 className="size-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-10">
        <Pagination />
      </div>
    </div>
  );
};
