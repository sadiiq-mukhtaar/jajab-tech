"use client";
import { Flex } from "@radix-ui/themes";
import { RiArrowRightSLine, RiArrowLeftSLine } from "react-icons/ri";
import React from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface Props {
  totalCount: number;
  currentPage: number;
  pageSize: number;
}

const Pagination = ({ currentPage, pageSize, totalCount }: Props) => {
  const pageCount = Math.ceil(totalCount / pageSize);
  const searchParams = useSearchParams();
  const router = useRouter();

  const changePage = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    router.push("?" + params.toString());
  };

  if (pageCount < 1) return null;

  return (
    <Flex gap="2" align={"center"} p={"4"}>
      <button
        className="bg-[whitesmoke] p-1 rounded-md hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={() => changePage(currentPage - 1)}
        disabled={currentPage <= 1}
      >
        <RiArrowLeftSLine className="text-gray-700" size={20} />
      </button>
      <p className="text-white">
        {currentPage} of {pageCount}
      </p>
      <button
        className="bg-[whitesmoke] p-1 rounded-md hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={() => changePage(currentPage + 1)}
        disabled={currentPage >= pageCount}
      >
        <RiArrowRightSLine className="text-gray-700" size={20} />
      </button>
    </Flex>
  );
};

export default Pagination;
