"use client";
import { Box, Flex } from "@radix-ui/themes";
import React from "react";
import FilterByServiceNeed from "./FilterByServiceNeed";
import FilterByStatus from "./FilterByStatus";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const CustomerActions = () => {
  const router = useRouter();
  const { status } = useSession();
  return (
    <Flex p={"5"} justify={"between"} wrap={"wrap"} gapY={"4"} gapX={"5"}>
      <Flex gap={"5"}>
        <FilterByServiceNeed />
        <FilterByStatus />
      </Flex>
      <Box>
        {status === "authenticated" && (
          <button
            onClick={() => router.push("/customers/add")}
            className="bg-[#4D55CC]  px-3 py-1 rounded-lg cursor-pointer"
          >
            Add New Customer
          </button>
        )}
      </Box>
    </Flex>
  );
};

export default CustomerActions;
