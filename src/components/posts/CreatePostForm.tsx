import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ChevronLeft } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch } from "@/hooks/use-app-dispatch";
import { useToast } from "@/hooks/use-toast";
import { createPost } from "@/store/posts/posts.slice";
import { Spinner } from "@/components/Spinner";
import { Button } from "@/components/ui/button";

import { postSchema, type Post } from "@/types/post.types";

export const CreatePostForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Post>({
    resolver: zodResolver(postSchema),
  });

  const onSubmit = async (data: Post) => {
    try {
      await dispatch(createPost(data)).unwrap();
      reset();
      toast({
        title: "Post created successfully!",
        variant: "success",
      });
    } catch (error) {
      console.error("Failed to create post:", error);
    }
  };

  return (
    <>
      <Link
        to="/posts"
        className="flex items-center gap-1 text-gray-500 hover:text-gray-700 mb-2"
      >
        <ChevronLeft className="size-3" />
        <p className="text-sm font-medium">Back to homepage</p>
      </Link>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-4 bg-white rounded-lg shadow"
      >
        <h2 className="text-2xl font-bold mb-4">Create New Post</h2>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Title</label>
          <input
            {...register("title")}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Body</label>
          <textarea
            {...register("body")}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={4}
          />
          {errors.body && (
            <p className="text-red-500 text-sm mt-1">{errors.body.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">User ID</label>
          <input
            type="number"
            {...register("userId", { valueAsNumber: true })}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {errors.userId && (
            <p className="text-red-500 text-sm mt-1">{errors.userId.message}</p>
          )}
        </div>
        <div className="flex gap-2">
          <Button type="submit" className="w-24" disabled={isSubmitting}>
            {isSubmitting ? <Spinner /> : "Create"}
          </Button>
          <Button
            className="w-24"
            onClick={() => navigate("/posts")}
            variant="secondary"
          >
            Cancel
          </Button>
        </div>
      </form>
    </>
  );
};
