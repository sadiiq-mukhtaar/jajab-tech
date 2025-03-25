import { prisma } from "@/prisma/client";
import { Customer } from "@prisma/client";
import { Box, Flex } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import { LuUsersRound } from "react-icons/lu";

interface Props {
  customers: number;
  activeCustomers: number;
  webServices: number;
  appServices: number;
}

const CustomersSummary = async ({
  customers,
  webServices,
  appServices,
  activeCustomers,
}: Props) => {
  return (
    <div className="flex flex-wrap gap-4 mt-4 ">
      <Box className="flex-1 min-w-[150px] p-4  rounded-lg bg-[#4D55CC]">
        <Link href={"/customers"}>
          <p className="font-[600]">All Costumers</p>
        </Link>
        <Flex gap={"2"} align="center">
          <LuUsersRound />
          <p>{customers}</p>
        </Flex>
      </Box>

      <Box className="flex-1 min-w-[150px] p-4  rounded-lg bg-[#4D55CC]">
        <Link href="/customers?status=OPEN">
          <p className="font-[600]">Active Customers</p>
        </Link>
        <Flex gap={"2"} align="center">
          <LuUsersRound />
          <p>{activeCustomers}</p>
        </Flex>
      </Box>

      <Box className="flex-1 min-w-[150px] p-4  rounded-lg bg-[#4D55CC]">
        <Link href={"customers?serviceNeed=Web+App"}>
          <p className="font-[600]">Web Services</p>
        </Link>
        <Flex gap={"2"} align="center">
          <LuUsersRound />
          <p>{webServices}</p>
        </Flex>
      </Box>

      <Box className="flex-1 min-w-[150px] p-4  rounded-lg bg-[#4D55CC]">
        <Link href={"/customers?&serviceNeed=Mobile+App"}>
          <p className="font-[600]">App Services</p>
        </Link>
        <Flex gap={"2"} align="center">
          <LuUsersRound />
          <p>{appServices}</p>
        </Flex>
      </Box>
    </div>
  );
};

export default CustomersSummary;
