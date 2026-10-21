import {
  Pagination as PaginationRoot,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";

type Props = {
  currentPage: number;
  totalPages: number;
  totalCount: number;
  perPage: number;
  onPageChange: (page: number) => void;
};

export const AdminPagination = ({
  currentPage,
  totalPages,
  totalCount,
  perPage,
  onPageChange,
}: Props) => {
  const from = (currentPage - 1) * perPage + 1;
  const to = Math.min(currentPage * perPage, totalCount);

  return (
    <div className="flex items-center">
      <p className="mr-2 text-sm text-gray-600">
        全 {totalCount} 件中 {from} ～ {to} 件を表示
      </p>

      <PaginationRoot className="w-auto justify-end">
        <PaginationContent className="gap-1">
          {currentPage > 1 && (
            <PaginationItem>
              <PaginationPrevious
                className="h-8 cursor-pointer rounded-sm border-gray-200 bg-white text-gray-400 hover:bg-gray-400 hover:text-white"
                onClick={() => onPageChange(currentPage - 1)}
              />
            </PaginationItem>
          )}

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <PaginationItem key={page}>
              <PaginationLink
                onClick={() => onPageChange(page)}
                className={cn(
                  page === currentPage
                    ? "pointer-events-none cursor-default rounded-sm border-gray-400 bg-gray-400 text-white"
                    : "cursor-pointer rounded-sm border-gray-200 bg-white text-gray-400 hover:bg-gray-400 hover:text-white",
                )}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}

          {currentPage < totalPages && (
            <PaginationItem>
              <PaginationNext
                className="cursor-pointer h-8 rounded-sm border-gray-200 bg-white text-sm text-gray-400 hover:bg-gray-400 hover:text-white"
                onClick={() => onPageChange(currentPage + 1)}
              />
            </PaginationItem>
          )}
        </PaginationContent>
      </PaginationRoot>
    </div>
  );
};
