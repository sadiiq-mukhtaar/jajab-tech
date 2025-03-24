"use client";
import { Flex } from "@radix-ui/themes";
import AccessingAvatar from "./AccessingAvatar";
import { usePathname } from "next/navigation";
import { MdDashboard } from "react-icons/md";
import { HiUsers } from "react-icons/hi";

const PageTitle = ({ title }: { title: String }) => {
  const currentPage = usePathname();
  return (
    <Flex justify={"between"} align={"center"}>
      <Flex align={"center"} gap={"2"}>
        {currentPage === "/dashboard" && <MdDashboard />}
        {currentPage === "/customers" && <HiUsers />}
        {title}
      </Flex>
      <AccessingAvatar />
    </Flex>
  );
};

export default PageTitle;
