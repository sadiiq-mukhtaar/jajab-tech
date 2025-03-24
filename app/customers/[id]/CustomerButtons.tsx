"use client";
import { Flex, Button } from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const CustomerButtons = ({ id }: { id: number }) => {
  const router = useRouter();
  const { status } = useSession();
  return (
    <div>
      {status === "authenticated" && (
        <Flex gap="3" mt="4">
          {" "}
          <Button
            variant="solid"
            color="blue"
            onClick={() => router.push(`/customers/${id}/edit`)}
          >
            Edit
          </Button>
          <Button
            variant="solid"
            color="red"
            onClick={async () => {
              router.push(`/customers/${id}/delete`);
            }}
          >
            Delete
          </Button>
        </Flex>
      )}
    </div>
  );
};

export default CustomerButtons;
