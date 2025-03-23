"use client";

import { Flex, Button } from "@radix-ui/themes";
import { useRouter } from "next/navigation";

const CustomerButtons = ({ id }: { id: number }) => {
  const router = useRouter();
  return (
    <Flex gap="3" mt="4">
      <Button
        variant="solid"
        color="blue"
        onClick={() => router.push(`/customers/${id}/edit`)}
      >
        Edit
      </Button>
      <Button variant="solid" color="red">
        Delete
      </Button>
    </Flex>
  );
};

export default CustomerButtons;
