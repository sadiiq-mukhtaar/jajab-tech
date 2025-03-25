"use client";

import { Card, Button, Flex, Text, Heading } from "@radix-ui/themes";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";

const DeletingPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const handleDelete = async () => {
    try {
      await axios.delete("/api/customer/" + id);
      toast.success("You have successfull deleted");
      router.push("/customers");
    } catch (e) {
      toast.error("unexpexted error " + e);
    }
  };

  const handleCancel = () => {
    router.push("/customers");
  };

  return (
    <Card style={{ maxWidth: 500, margin: "0 auto", marginTop: "2rem" }}>
      <Flex direction="column" gap="4">
        <Heading size="5" align="center">
          Confirm Deletion
        </Heading>
        <Text align="center" color="gray">
          Are you sure you want to delete this item? This action cannot be
          undone.
        </Text>

        <Flex gap="3" justify="center" mt="4">
          <Button variant="soft" color="gray" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="solid" color="red" onClick={handleDelete}>
            Delete
          </Button>
        </Flex>
      </Flex>
      <Toaster />
    </Card>
  );
};

export default DeletingPage;
