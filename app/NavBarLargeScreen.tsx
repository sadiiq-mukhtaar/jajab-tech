"use client";
import { Flex, Box, Heading } from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { FiLogOut } from "react-icons/fi";
import { HiUsers } from "react-icons/hi";
import { MdDashboard } from "react-icons/md";
import Spinner from "./components/Spinner";
import { usePathname } from "next/navigation";
import classnames from "classnames";
const NavBar = () => {
  const { status } = useSession();
  const current = usePathname();
  const dashboardExpression = current === "/dashboard";
  const customersExpression = current === "/customers";
  const dashboardStyle = {
    "bg-[#4D55CC]": dashboardExpression,
    "font-semibold": true,
    "px-2": dashboardExpression,
    "py-1": dashboardExpression,
    "rounded-sm": dashboardExpression,
  };

  const customerStyle = {
    "bg-[#4D55CC]": customersExpression,
    "font-semibold": true,
    "px-2": customersExpression,
    "py-1": customersExpression,
    "rounded-sm": customersExpression,
  };

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
            <Flex
              align={"center"}
              gap={"2"}
              mb={"6"}
              className={classnames(dashboardStyle)}
            >
              <MdDashboard /> <Link href={"/dashboard"}>Dashboard</Link>
            </Flex>
            <Flex
              align={"center"}
              gap={"2"}
              className={classnames(customerStyle)}
            >
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
