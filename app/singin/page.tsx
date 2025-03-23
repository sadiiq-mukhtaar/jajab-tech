import { Flex, Heading, Text } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import { FcGoogle } from "react-icons/fc";

const SignPage = () => {
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
          <Text className="text-white">
            Continue with Google or enter your details
          </Text>
        </Flex>

        <button
          className="w-[90%] flex items-center justify-center gap-2 py-2 rounded-lg cursor-pointer "
          style={{ backgroundColor: "#211C84" }}
        >
          <FcGoogle size={"25"} />
          <span className="text-white">Sign In with Google</span>
        </button>

        <div className="w-full flex items-center gap-4">
          <hr className="flex-1 border-gray-400" />
          <Text className="text-white">or</Text>
          <hr className="flex-1 border-gray-400" />
        </div>

        <Flex direction={"column"} gap={"4"} className="w-full">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 bg-transparent border-b border-gray-400 outline-none text-white placeholder-gray-300"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 bg-transparent border-b border-gray-400 outline-none text-white placeholder-gray-300"
          />
        </Flex>

        <button className="w-full py-2 rounded-lg bg-[#211C84] cursor-pointer">
          <span className="text-white">Sign In</span>
        </button>

        <Text className="text-white">
          Don't have an account?{" "}
          <Link href="#" className="underline ">
            Sign up for free
          </Link>
        </Text>
      </Flex>
    </div>
  );
};

export default SignPage;
