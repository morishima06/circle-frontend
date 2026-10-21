// components/Pagination.tsx
import { useRouter } from "next/router";
import React from "react";
import ReactPaginate from "react-paginate";

type Props = {
  totalPages: number;
};

export const Pagination = ({ totalPages }: Props) => {
  const router = useRouter();
  const { query, pathname } = router;

  const currentPage = Number(query.page || 1);

  if (!totalPages || totalPages <= 1) return null;

  const handlePageChange = ({ selected }: { selected: number }) => {
    const newPage = selected + 1;

    const newQuery = { ...query };
    if (newPage === 1) {
      delete newQuery.page;
    } else {
      newQuery.page = newPage.toString();
    }

    router.push({
      pathname,
      query: newQuery,
    });
  };

  return (
    <ReactPaginate
      pageCount={totalPages}
      forcePage={currentPage - 1} // 現在ページを反映
      onPageChange={handlePageChange}
      pageRangeDisplayed={3}
      marginPagesDisplayed={1}
      previousLabel="< 前へ"
      nextLabel="次へ >"
      containerClassName="flex justify-center items-center gap-2 mt-8"
      pageClassName="w-8 h-8 flex items-center justify-center text-sm hover:bg-black hover:text-white"
      pageLinkClassName="w-full h-full flex items-center justify-center cursor-pointer"
      activeClassName="text-black underline underline-offset-2"
      previousClassName="mr-2 text-sm"
      nextClassName="ml-2 text-sm"
      breakLabel="..."
      breakClassName="mx-2"
      disabledClassName="text-gray-400"
      disabledLinkClassName="pointer-events-none text-gray-400"
    />
  );
};
