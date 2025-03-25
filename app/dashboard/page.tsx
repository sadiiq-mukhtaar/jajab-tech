import { prisma } from "@/prisma/client";
import { Box, Flex } from "@radix-ui/themes";
import PageTitle from "../components/PageTitle";
import CustomersSummary from "./CustomersSummary";

const DashboardPage = async () => {
  const customers = await prisma.customer.count();

  const activeCustomers = await prisma.customer.count({
    where: { seviceStatus: "OPEN" },
  });
  const webServices = await prisma.customer.count({
    where: { serviceNeed: "Web App" },
  });
  const appServices = await prisma.customer.count({
    where: { serviceNeed: "Mobile App" },
  });
  return (
    <Box p={"4"}>
      <PageTitle title={"Dashboard"} />

      <CustomersSummary
        customers={customers}
        activeCustomers={activeCustomers}
        appServices={appServices}
        webServices={webServices}
      />

      <div className="bg-[#4D55CC] rounded-lg w-[100%] h-[300px] mt-20 p-4">
        <h1 className="font-[600]">Progress Services : </h1>
      </div>
    </Box>
  );
};

export default DashboardPage;
