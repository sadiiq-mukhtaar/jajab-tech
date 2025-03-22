import { Flex, Box, Heading } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import { FiLogOut } from "react-icons/fi";
import { HiUsers } from "react-icons/hi";
import { MdDashboard } from "react-icons/md";

const NavBar = () => {
  return (
    <>
      <Flex
        justify={"between"}
        align={"center"}
        height={"100vh"}
        direction={"column"}
        className="hidden md:block pt-3 pl-3"
      >
        <Box>
          <Heading>JaJab Tech</Heading>
          <Box className="mt-15">
            <Flex align={"center"} gap={"2"} mb={"6"}>
              <MdDashboard />{" "}
              <Link href={"/dashboard"} className="font-semibold">
                Dashboard
              </Link>
            </Flex>
            <Flex align={"center"} gap={"2"} className="font-semibold">
              <HiUsers /> <Link href={"/customers"}>Customers</Link>
            </Flex>
          </Box>
        </Box>
        <Flex align={"center"} gap={"2"} ml={"-7"}>
          <FiLogOut />{" "}
          <Link href={"/users"} className="font-semibold">
            Log Out
          </Link>
        </Flex>
      </Flex>
    </>
  );
};

export default NavBar;
