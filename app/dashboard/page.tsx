import { prisma } from "@/prisma/client";
import { Box, Flex } from "@radix-ui/themes";
import { LuUsersRound } from "react-icons/lu";
import PageTitle from "../components/PageTitle";

const DashboardPage = async () => {
  const customers = await prisma.customer.findMany();
  const activeCustomers = await prisma.customer.findMany({
    where: { seviceStatus: "OPEN" },
  });
  return (
    <Box p={"4"}>
      <PageTitle title={"Dashboard"} />

      <div className="flex flex-wrap gap-4 mt-4 ">
        <Box className="flex-1 min-w-[150px] p-4  rounded-lg bg-[#4D55CC]">
          <p className="font-[600]">All Costumers</p>
          <Flex gap={"2"} align="center">
            <LuUsersRound />
            <p>{customers.length}</p>
          </Flex>
        </Box>

        <Box className="flex-1 min-w-[150px] p-4  rounded-lg bg-[#4D55CC]">
          <p className="font-[600]">Active Customers</p>
          <Flex gap={"2"} align="center">
            <LuUsersRound />
            <p>{activeCustomers.length}</p>
          </Flex>
        </Box>
      </div>

      <div className="bg-[#4D55CC] rounded-lg w-[100%] h-[300px] mt-20 p-4">
        <h1 className="font-[600]">Progress Services : </h1>
      </div>
    </Box>
  );
};

export default DashboardPage;
