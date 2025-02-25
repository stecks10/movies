import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";

interface PagePaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function PagePagination({
  currentPage,
  totalPages,
  onPageChange,
}: PagePaginationProps) {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const startPage = Math.max(1, currentPage - 2);
  const endPage = Math.min(totalPages, currentPage + 2);

  return (
    <Pagination className="gap-4">
      <PaginationPrevious
        onClick={currentPage === 1 ? undefined : handlePrevious}
        className={`${
          currentPage === 1
            ? "bg-zinc-800 text-zinc-500 cursor-not-allowed border border-zinc-500"
            : "bg-purple-300 text-black hover:bg-purple-500 hover:text-white"
        } px-4 py-2 rounded`}
      />
      <PaginationContent className="gap-2">
        {Array.from({ length: endPage - startPage + 1 }, (_, index) => {
          const page = startPage + index;
          return (
            <PaginationItem key={page}>
              <PaginationLink
                isActive={currentPage === page}
                className={
                  currentPage === page
                    ? "bg-black text-white border-zinc-100"
                    : "bg-purple-700 text-white hover:bg-purple-500 hover:text-white"
                }
                onClick={() => onPageChange(page)}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          );
        })}
      </PaginationContent>
      <PaginationNext
        onClick={handleNext}
        className={`${
          currentPage === totalPages
            ? "bg-zinc-800 text-zinc-500 cursor-not-allowed border border-zinc-500"
            : "bg-purple-300 text-black hover:bg-purple-500 hover:text-white"
        } px-4 py-2 rounded`}
      />
    </Pagination>
  );
}
