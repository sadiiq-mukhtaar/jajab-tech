"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Callout, Flex, Spinner, Text } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { formSchema } from "./formSchema";

const AddCustomer = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isLaoding, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      setLoading(true);
      await axios.post("/api/customer", data);
      router.push("/customers");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setLoading(false);
        const errorMessage =
          error.response?.data?.message || "An error occurred";
        setError(errorMessage);
      } else {
        setLoading(false);
        setError("An unexpected error occurred.");
      }
    }
  });

  return (
    <form className="p-8" onSubmit={onSubmit}>
      <div className="bg-[#4D55CC] rounded-lg p-5">
        {error && (
          <Callout.Root color="red" ml={"-2"} mb={"2"}>
            <Callout.Text>{error}</Callout.Text>
          </Callout.Root>
        )}
        <h1 className="font-bold text-white">Add Customer</h1>

        <Flex gap="5" wrap="wrap" mt="5">
          <Box className="flex-1 min-w-[200px]">
            <input
              {...register("firstName")}
              type="text"
              className="w-full border-b-1 outline-none bg-transparent border-white text-white placeholder-white"
              placeholder="First name :"
            />
            {errors.firstName && (
              <Text color="red" as="p" className="text-sm mt-1">
                {errors.firstName.message}
              </Text>
            )}
          </Box>
          <Box className="flex-1 min-w-[200px]">
            <input
              {...register("lastName")}
              type="text"
              className="w-full border-b-1 outline-none bg-transparent border-white text-white placeholder-white"
              placeholder="Last name :"
            />
            {errors.lastName && (
              <Text color="red" as="p" className="text-sm mt-1">
                {errors.lastName.message}
              </Text>
            )}
          </Box>
        </Flex>

        <Flex gap="5" wrap="wrap" mt="6">
          <Box className="flex-1 min-w-[200px]">
            <input
              {...register("email")}
              type="text"
              className="w-full border-b-1 outline-none bg-transparent border-white text-white placeholder-white"
              placeholder="Email :"
            />
            {errors.email && (
              <Text color="red" as="p" className="text-sm mt-1">
                {errors.email.message}
              </Text>
            )}
          </Box>
          <Box className="flex-1 min-w-[200px]">
            <input
              {...register("phoneNumber")}
              type="text"
              className="w-full border-b-1 outline-none bg-transparent border-white text-white placeholder-white"
              placeholder="Phone number :"
            />
            {errors.phoneNumber && (
              <Text color="red" as="p" className="text-sm mt-1">
                {errors.phoneNumber.message}
              </Text>
            )}
          </Box>
        </Flex>

        <Flex gap="5" wrap="wrap" mt="6">
          <Box className="flex-1 min-w-[200px]">
            <input
              {...register("serviceNeed")}
              type="text"
              className="w-full border-b-1 outline-none bg-transparent border-white text-white placeholder-white"
              placeholder="Service need :"
            />
            {errors.serviceNeed && (
              <Text color="red" as="p" className="text-sm mt-1">
                {errors.serviceNeed.message}
              </Text>
            )}
          </Box>
          <Box className="flex-1 min-w-[200px]">
            <input
              {...register("seviceStatus")}
              type="text"
              className="w-full border-b-1 outline-none bg-transparent border-white text-white placeholder-white"
              placeholder="Service status :"
            />
            {errors.seviceStatus && (
              <Text color="red" as="p" className="text-sm mt-1">
                {errors.seviceStatus.message}
              </Text>
            )}
          </Box>
        </Flex>

        <Flex gap="5" wrap="wrap" mt="6">
          <Box className="flex-1 min-w-[200px]">
            <textarea
              {...register("serviceDetails")}
              className="w-full border-b-1 outline-none bg-transparent border-white text-white placeholder-white"
              placeholder="Service detail :"
            />
            {errors.serviceDetails && (
              <Text color="red" as="p" className="text-sm mt-1">
                {errors.serviceDetails.message}
              </Text>
            )}
          </Box>
          <Box className="flex-1 min-w-[200px]">
            <button
              type="submit"
              className="bg-[#211C84] rounded-lg px-3 py-1 cursor-pointer text-white"
            >
              {isLaoding && (
                <Flex gap={"2"} align={"center"}>
                  {" "}
                  <Spinner />
                  Add Customer
                </Flex>
              )}
              {isLaoding || (
                <Flex gap={"2"} align={"center"}>
                  Add Customer
                </Flex>
              )}
            </button>
          </Box>
        </Flex>
      </div>
    </form>
  );
};

export default AddCustomer;
