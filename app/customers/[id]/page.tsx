import { prisma } from "@/prisma/client";
import { Box, Flex, Text } from "@radix-ui/themes";
import ServiceNeedIcon from "../ServiceNeedIcon";
import StatusBadge from "../StatusBadge";
import CustomerButtons from "./CustomerButtons";

interface Props {
  params: Promise<{ id: string }>;
}

const CustomerDetailsPage = async ({ params }: Props) => {
  const id = parseInt((await params).id);
  const customer = await prisma.customer.findUnique({
    where: {
      id,
    },
  });

  if (!customer) {
    return <Text>Customer not found</Text>;
  }

  return (
    <Box className="p-4">
      <div className="bg-[#4D55CC] p-4 rounded-lg">
        <h1 className="font-bold text-2xl text-white mb-4">
          Customer Details :
        </h1>
        <Flex direction="column" gap="5">
          {/* Customer Name and Service Details */}
          <Flex direction={"column"} gap={"5"}>
            <Flex direction="column" gap="1">
              <Text className="font-semibold text-white">Customer Name :</Text>
              <Text className="text-sm text-white">
                {customer.firstName} {customer.lastName}
              </Text>
            </Flex>

            <Flex direction="column" gap="1">
              <Text className="font-semibold text-white">
                Service Details :
              </Text>
              <Text className="text-sm text-white">
                {customer.serviceDetails}
              </Text>
            </Flex>
          </Flex>

          {/* Email and Phone Number */}
          <Flex direction="column" gap="4">
            <Flex direction="column" gap="1">
              <Text className="font-semibold text-white">Email :</Text>
              <Text className="text-sm text-white">{customer.email}</Text>
            </Flex>

            <Flex direction="column" gap="1">
              <Text className="font-semibold text-white">Phone Number :</Text>
              <Text className="text-sm text-white">{customer.phoneNumber}</Text>
            </Flex>
          </Flex>

          {/* Service Status and Service Need */}
          <Flex direction="column" gap="4">
            <Flex direction="column" gap="1">
              <Text className="font-semibold text-white">Service Status :</Text>
              <StatusBadge status={customer.seviceStatus} />
            </Flex>

            <Flex direction="column" gap="1">
              <Text className="font-semibold text-white">Service Need :</Text>
              <ServiceNeedIcon serviceNeed={customer.serviceNeed} />
            </Flex>
          </Flex>

          {/* Edit and Delete Buttons */}
          <CustomerButtons id={customer.id} />
        </Flex>
      </div>
    </Box>
  );
};

export default CustomerDetailsPage;
