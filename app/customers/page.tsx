import { prisma } from "@/prisma/client";
import { Box, Flex, Table } from "@radix-ui/themes";
import React from "react";
import PageTitle from "../components/PageTitle";
import { HiUsers } from "react-icons/hi";
import StatusBadge from "./StatusBadge";
import ServiceNeedIcon from "./ServiceNeedIcon";
import FilterByServiceNeed from "./FilterByServiceNeed";
import FilterByStatus from "./FilterByStatus";
import CustomerActions from "./CustomerActions";
import Link from "next/link";

interface Props {
  searchParams: Promise<{ status: string; serviceNeed: string }>;
}

const UsersPage = async ({ searchParams }: Props) => {
  const { status, serviceNeed } = await searchParams;
  const customers = await prisma.customer.findMany({
    where: {
      seviceStatus: status || undefined,
      serviceNeed: serviceNeed || undefined,
    },
  });
  return (
    <>
      <Box p={"4"}>
        <Flex align={"center"} gap={"2"}>
          <HiUsers />
          <PageTitle title={"Users"} />
        </Flex>
      </Box>

      <Box>
        <CustomerActions />
      </Box>

      <Table.Root
        variant="surface"
        m={"3"}
        className="min-w-[250px] md:w-[97%]"
      >
        <Table.Header>
          <Table.Row className="font-extrabold bg-gray-400">
            <Table.Cell>Name</Table.Cell>
            <Table.Cell className="hidden md:table-cell">Email</Table.Cell>
            <Table.Cell className="hidden md:md:table-cell">
              Service Status
            </Table.Cell>
            <Table.Cell className="hidden md:md:table-cell">
              Service Type
            </Table.Cell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {customers.map((customer) => (
            <Table.Row key={customer.id}>
              <Table.Cell>
                <Link href={`/customers/${customer.id}`}>
                  {" "}
                  {`${customer.firstName} ${customer.lastName}`}
                </Link>
                <div className="md:hidden mt-2">
                  {" "}
                  <StatusBadge status={customer.seviceStatus} />
                </div>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {customer.email}
              </Table.Cell>
              <Table.Cell className="hidden md:md:table-cell">
                <StatusBadge status={customer.seviceStatus} />
              </Table.Cell>
              <Table.Cell className="hidden md:md:table-cell">
                <ServiceNeedIcon serviceNeed={customer.serviceNeed} />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </>
  );
};

export default UsersPage;
