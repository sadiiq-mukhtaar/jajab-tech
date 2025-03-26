"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Flex, Heading, Text } from "@radix-ui/themes";
import axios, { AxiosError } from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { z } from "zod";

const createUserSchema = z.object({
  name: z.string().min(1, "Name is reqired"),
  email: z
    .string()
    .min(1, { message: "This field has to be filled." })
    .email("This is not a valid email."),
  password: z.string().min(7, "Password must be at least  7 character's"),
  adminPassword: z.string().min(1, "Admin password is reqired"),
});

type CreateUserSchema = z.infer<typeof createUserSchema>;

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateUserSchema>({
    resolver: zodResolver(createUserSchema),
  });

  const router = useRouter();
  const onSubmit = () => {
    return handleSubmit(async (data) => {
      try {
        const res = await axios.post("/api/user", data);
        if (res.status === 201) toast.success("you have sucessfully created");
        setTimeout(() => router.push("/api/auth/signin"), 2000);
      } catch (error) {
        if (error instanceof AxiosError) {
          toast.error(error.response?.data.message);
        }
      }
    });
  };
  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ backgroundColor: "#4D55CC" }}
    >
      <Flex
        direction={"column"}
        align={"center"}
        justify={"center"}
        gap={"6"}
        className="w-full max-w-md p-8 rounded-lg "
        style={{ backgroundColor: "#4D55CC" }}
      >
        <Flex direction={"column"} align={"start"} gap={"4"}>
          <Heading size="7" className="text-white">
            Welcome back,
          </Heading>
        </Flex>

        <Flex direction={"column"} gap={"4"} className="w-full">
          <form onSubmit={onSubmit()}>
            <input
              {...register("name")}
              type="text"
              placeholder="Name :"
              className="w-full p-3 bg-transparent border-b border-gray-400 outline-none text-white placeholder-gray-300"
            />
            {errors?.name && (
              <Text color="red" mt={"1"} mb={"2"}>
                {errors.name?.message}
              </Text>
            )}
            <input
              {...register("email")}
              type="email"
              placeholder="Email"
              className="w-full p-3 bg-transparent border-b border-gray-400 outline-none text-white placeholder-gray-300"
            />
            {errors?.email && (
              <Text color="red" mt={"1"} mb={"2"}>
                {errors.email?.message}
              </Text>
            )}
            <input
              {...register("password")}
              type="password"
              placeholder="Password"
              className="w-full p-3 bg-transparent border-b border-gray-400 outline-none text-white placeholder-gray-300"
            />
            {errors?.password && (
              <Text color="red" mt={"1"} mb={"2"}>
                {errors.password?.message}
              </Text>
            )}
            <input
              {...register("adminPassword")}
              type="text"
              placeholder="Admin password :"
              className="w-full p-3 bg-transparent border-b border-gray-400 outline-none text-white placeholder-gray-300"
            />
            {errors?.adminPassword && (
              <Text color="red" mt={"1"} mb={"2"}>
                {errors.adminPassword?.message}
              </Text>
            )}
            <button className="w-full py-2 rounded-lg bg-[#211C84] cursor-pointer mt-4">
              <span className="text-white">register</span>
            </button>
          </form>
        </Flex>

        <Text className="text-white">
          have an account?{" "}
          <Link href="/api/auth/signin" className="underline ">
            Sign In
          </Link>
        </Text>
      </Flex>
      <Toaster />
    </div>
  );
};

export default RegisterForm;
