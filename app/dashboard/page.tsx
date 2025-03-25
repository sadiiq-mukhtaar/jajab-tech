import { prisma } from "@/prisma/client";
import { Box } from "@radix-ui/themes";
import PageTitle from "../components/PageTitle";
import CustomersSummary from "./CustomersSummary";
import CustomersChart from "./CustomersChart";

const DashboardPage = async () => {
  const customers = await prisma.customer.count();

  const open = await prisma.customer.count({
    where: { seviceStatus: "OPEN" },
  });
  const close = await prisma.customer.count({
    where: { seviceStatus: "CLOSED" },
  });
  const inProgress = await prisma.customer.count({
    where: { seviceStatus: "IN_PROGRESS" },
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
        activeCustomers={open}
        appServices={appServices}
        webServices={webServices}
      />

      <div className="bg-[#4D55CC] rounded-lg w-[100%] h-[300px] mt-20 p-4 mb-10">
        <h1 className="font-[600]">Progress Services : </h1>
        <CustomersChart open={open} close={close} inProgress={inProgress} />
      </div>
    </Box>
  );
};

export const dynamic = "force-dynamic";
export default DashboardPage;
