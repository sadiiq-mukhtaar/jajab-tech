"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Flex, Text } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  firstName: z
    .string()
    .min(1, "First name is required")
    .max(30, "First name must be less than 30 characters"),

  lastName: z
    .string()
    .min(1, "Last name is required")
    .max(30, "Last name must be less than 30 characters"),

  email: z
    .string()
    .min(1, "This field has to be filled.")
    .email("This is not a valid email."),

  phoneNumber: z.string().min(1, "Mobile number is reqired"),

  serviceNeed: z
    .string()
    .min(1, "Service need is required")
    .max(100, "Must be less than 100 characters"),

  serviceDetails: z.string().min(1, "Service details are required"),

  seviceStatus: z
    .string()
    .min(1, "Service status is required")
    .max(20, "Must be less than 20 characters"),
});

const AddCustomer = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      await axios.post("/api/customer", data);
      router.push("/users");
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <form className="p-8" onSubmit={onSubmit}>
      <div className="bg-[#4D55CC] rounded-lg p-5">
        <h1 className="font-bold text-white">Add Customer</h1>

        {/* First Name and Last Name */}
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

        {/* Email and Phone Number */}
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

        {/* Service Need and Service Status */}
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

        {/* Service Details and Submit Button */}
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
              Add Customer
            </button>
          </Box>
        </Flex>
      </div>
    </form>
  );
};

export default AddCustomer;
