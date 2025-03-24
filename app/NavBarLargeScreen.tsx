"use client";
import { Flex, Box, Heading } from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { FiLogOut } from "react-icons/fi";
import { HiUsers } from "react-icons/hi";
import { MdDashboard } from "react-icons/md";
import Spinner from "./components/Spinner";

const NavBar = () => {
  const { data: ession, status } = useSession();
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
          {status === "authenticated" && (
            <Link href={"/api/auth/signout"} className="font-semibold">
              Sign Out
            </Link>
          )}
          {status === "loading" && <Spinner />}
          {status === "unauthenticated" && (
            <Link href={"/api/auth/signout"} className="font-semibold">
              Sign In
            </Link>
          )}
        </Flex>
      </Flex>
    </>
  );
};

export default NavBar;
