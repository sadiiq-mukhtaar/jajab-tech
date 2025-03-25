"use client";
import { Flex, Heading } from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { FiLogOut } from "react-icons/fi";
import { LuUsersRound } from "react-icons/lu";
import { MdDashboard } from "react-icons/md";
import Spinner from "./components/Spinner";
import { IoPersonAddSharp } from "react-icons/io5";

const NavBarSmallScreen = () => {
  const { status } = useSession();
  return (
    <div className="bg-[#4D55CC] shadow-md p-4">
      <Flex justify="between" align="center">
        <Heading>JaJab Tech</Heading>
        <Flex gap="4" align="center">
          <Link href="/dashboard">
            <MdDashboard className="text-xl" />
          </Link>
          <Link href="/customers">
            <LuUsersRound className="text-xl" />
          </Link>
          <Link href="/register">
            <IoPersonAddSharp className="text-xl" />
          </Link>
          {status === "authenticated" && (
            <Link href="/api/auth/signout">
              <FiLogOut className="text-xl" />
            </Link>
          )}
          {status === "unauthenticated" && (
            <Link href="/api/auth/signin">
              <FiLogOut className="text-xl" />
            </Link>
          )}
          {status === "loading" && <Spinner />}
        </Flex>
      </Flex>
    </div>
  );
};

export default NavBarSmallScreen;
