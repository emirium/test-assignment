import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ChevronLeft } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch } from "@/hooks/use-app-dispatch";
import { useAppSelector } from "@/hooks/use-app-selector";
import { useToast } from "@/hooks/use-toast";
import { updatePost, fetchPostById } from "@/store/posts/posts.slice";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/Spinner";

import { postSchema, type PostFormData } from "@/types/post.types";

export const EditPostForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { selectedPost, loading } = useAppSelector((state) => state.posts);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<PostFormData>({
    resolver: zodResolver(postSchema.omit({ id: true })),
  });

  useEffect(() => {
    const fetchPost = async () => {
      if (id) {
        await dispatch(fetchPostById(parseInt(id, 10))).unwrap();
      }
    };

    fetchPost();
  }, [id, dispatch]);

  useEffect(() => {
    if (selectedPost) {
      reset({
        title: selectedPost.title,
        body: selectedPost.body,
        userId: selectedPost.userId,
      });
    }
  }, [selectedPost, reset]);

  const onSubmit = async (data: PostFormData) => {
    try {
      await dispatch(
        updatePost({
          id: parseInt(id!, 10),
          post: data,
        }),
      ).unwrap();
      toast({
        title: "Post updated successfully!",
        variant: "success",
      });
    } catch (error) {
      console.error("Failed to save post:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center p-4">
        <Spinner className="text-blue-500" />
      </div>
    );
  }

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
        <h2 className="text-2xl font-bold mb-4">Edit Post</h2>
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
            {isSubmitting ? <Spinner /> : "Update"}
          </Button>
          <Button
            variant="secondary"
            className="w-24"
            onClick={() => navigate("/posts")}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
        </div>
      </form>
    </>
  );
};
