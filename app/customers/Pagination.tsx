"use client";
import { Flex } from "@radix-ui/themes";
import { RiArrowRightSLine, RiArrowLeftSLine } from "react-icons/ri";
import React from "react";

interface Props {
  totalCount: number;
  currentPage: number;
  pageSize: number;
}

const Pagination = ({ currentPage, pageSize, totalCount }: Props) => {
  const pageCount = Math.ceil(totalCount / pageSize);
  return (
    <Flex gap="2" align={"center"} p={"4"}>
      <button className="bg-[whitesmoke] p-1 rounded-md hover:bg-gray-200 transition-colors">
        <RiArrowLeftSLine className="text-gray-700" size={20} />
      </button>
      <p className="text-white">
        {currentPage} of {pageCount}
      </p>
      <button className="bg-[whitesmoke] p-1 rounded-md hover:bg-gray-200 transition-colors">
        <RiArrowRightSLine className="text-gray-700" size={20} />
      </button>
    </Flex>
  );
};

export default Pagination;
