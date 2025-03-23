"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Callout, Flex, Spinner, Text } from "@radix-ui/themes";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { formSchema } from "../../add/formSchema";
import { Customer } from "@prisma/client";

const AddCustomer = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);
  const { id } = useParams();
  const [customer, setCustomer] = useState<Customer | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    const fetchingCustomer = async () => {
      try {
        const response = await axios.get(`/api/customer/${id}`);
        setCustomer(response.data);
      } catch (error) {
        console.error("Failed to fetch customer:", error);
        setError("Failed to fetch customer data");
      }
    };

    fetchingCustomer();
  }, [id]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      setLoading(true);
      await axios.put(`/api/customer/${id}`, data);
      router.push("/customers");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage =
          error.response?.data?.message || "An error occurred";
        setError(errorMessage);
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
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
        <h1 className="font-bold text-white">Edit Customer</h1>

        {/* First Name and Last Name */}
        <Flex gap="5" wrap="wrap" mt="5">
          <Box className="flex-1 min-w-[200px]">
            <input
              {...register("firstName")}
              type="text"
              className="w-full border-b-1 outline-none bg-transparent border-white text-white placeholder-white"
              placeholder="First name :"
              defaultValue={customer?.firstName || ""}
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
              defaultValue={customer?.lastName || ""}
            />
            {errors.lastName && (
              <Text color="red" as="p" className="text-sm mt-1">
                {errors.lastName.message}
              </Text>
            )}
          </Box>
        </Flex>

        {/* Email and Phone Number */}
        <Flex gap="5" wrap="wrap" mt="6">
          <Box className="flex-1 min-w-[200px]">
            <input
              {...register("email")}
              type="text"
              className="w-full border-b-1 outline-none bg-transparent border-white text-white placeholder-white"
              placeholder="Email :"
              defaultValue={customer?.email || ""}
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
              defaultValue={customer?.phoneNumber || ""}
            />
            {errors.phoneNumber && (
              <Text color="red" as="p" className="text-sm mt-1">
                {errors.phoneNumber.message}
              </Text>
            )}
          </Box>
        </Flex>

        {/* Service Need and Service Status */}
        <Flex gap="5" wrap="wrap" mt="6">
          <Box className="flex-1 min-w-[200px]">
            <input
              {...register("serviceNeed")}
              type="text"
              className="w-full border-b-1 outline-none bg-transparent border-white text-white placeholder-white"
              placeholder="Service need :"
              defaultValue={customer?.serviceNeed || ""}
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
              defaultValue={customer?.seviceStatus || ""}
            />
            {errors.seviceStatus && (
              <Text color="red" as="p" className="text-sm mt-1">
                {errors.seviceStatus.message}
              </Text>
            )}
          </Box>
        </Flex>

        {/* Service Details */}
        <Flex gap="5" wrap="wrap" mt="6">
          <Box className="flex-1 min-w-[200px]">
            <textarea
              {...register("serviceDetails")}
              className="w-full border-b-1 outline-none bg-transparent border-white text-white placeholder-white"
              placeholder="Service details :"
              defaultValue={customer?.serviceDetails || ""}
            />
            {errors.serviceDetails && (
              <Text color="red" as="p" className="text-sm mt-1">
                {errors.serviceDetails.message}
              </Text>
            )}
          </Box>
        </Flex>

        {/* Submit Button */}
        <Flex gap="5" wrap="wrap" mt="6">
          <Box className="flex-1 min-w-[200px]">
            <button
              type="submit"
              className="bg-[#211C84] rounded-lg px-3 py-1 cursor-pointer text-white"
              disabled={isLoading}
            >
              {isLoading ? (
                <Flex gap={"2"} align={"center"}>
                  <Spinner />
                  Edit Customer
                </Flex>
              ) : (
                "Edit Customer"
              )}
            </button>
          </Box>
        </Flex>
      </div>
    </form>
  );
};

export default AddCustomer;
