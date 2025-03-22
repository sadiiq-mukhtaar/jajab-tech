import { Flex, Heading } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import { FiLogOut } from "react-icons/fi";
import { LuUsersRound } from "react-icons/lu";
import { MdDashboard } from "react-icons/md";

const NavBarSmallScreen = () => {
  return (
    <div className="bg-[#4D55CC] shadow-md p-4">
      <Flex justify="between" align="center">
        <Heading>JaJab Tech</Heading>
        <Flex gap="4" align="center">
          <Link href="/dashboard">
            <MdDashboard className="text-xl" />
          </Link>
          <Link href="/users">
            <LuUsersRound className="text-xl" />
          </Link>
          <Link href="/logout">
            <FiLogOut className="text-xl" />
          </Link>
        </Flex>
      </Flex>
    </div>
  );
};

export default NavBarSmallScreen;
