import { prisma } from "@/prisma/client";
import { Box, Table } from "@radix-ui/themes";
import Link from "next/link";
import PageTitle from "../components/PageTitle";
import CustomerActions from "./CustomerActions";
import ServiceNeedIcon from "./ServiceNeedIcon";
import StatusBadge from "./StatusBadge";
import Pagination from "./Pagination";

interface Props {
  searchParams: Promise<{ status: string; serviceNeed: string; page: string }>;
}

const UsersPage = async ({ searchParams }: Props) => {
  const { status, serviceNeed, page } = await searchParams;
  const currentPage = parseInt(page);
  const pageSize = 10;

  const totalCount = await prisma.customer.count({});
  const customers = await prisma.customer.findMany({
    where: {
      seviceStatus: status || undefined,
      serviceNeed: serviceNeed || undefined,
    },
    take: pageSize,
    skip: (currentPage - 1) * pageSize,
  });
  return (
    <>
      <Box p={"4"}>
        <PageTitle title={"Customers"} />
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
      <Pagination
        totalCount={totalCount}
        currentPage={currentPage}
        pageSize={pageSize}
      />
    </>
  );
};

export default UsersPage;
