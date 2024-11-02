import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useAppDispatch } from "@/hooks/use-app-dispatch";
import { useAppSelector } from "@/hooks/use-app-selector";
import { setCurrentPage } from "@/store/posts/posts.slice";
import { Button } from "@/components/ui/button";

export const Pagination: React.FC = () => {
  const dispatch = useAppDispatch();
  const { totalPosts, currentPage, postsPerPage } = useAppSelector(
    (state) => state.posts,
  );
  const totalPages = Math.ceil(totalPosts / postsPerPage);

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2 my-4">
      <Button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        variant="ghost"
      >
        <ChevronLeft />
        Previous
      </Button>
      {Array.from({ length: totalPages }, (_, i) => i + 1)
        .filter(
          (page) =>
            Math.abs(page - currentPage) <= 2 ||
            page === 1 ||
            page === totalPages,
        )
        .map((page, index, array) => (
          <React.Fragment key={page}>
            {index > 0 && array[index - 1] !== page - 1 && (
              <span className="px-4 py-2">...</span>
            )}
            <Button
              onClick={() => handlePageChange(page)}
              variant={currentPage === page ? "outline" : "secondary"}
            >
              {page}
            </Button>
          </React.Fragment>
        ))}
      <Button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        variant="ghost"
      >
        Next <ChevronRight />
      </Button>
    </div>
  );
};
