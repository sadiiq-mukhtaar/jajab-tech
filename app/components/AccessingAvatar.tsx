"use client";
import React from "react";
import Link from "next/link";
import Spinner from "./Spinner";
import { Box, Avatar } from "@radix-ui/themes";
import { useSession } from "next-auth/react";

const AccessingAvatar = () => {
  const { data: session, status } = useSession();
  return (
    <Box>
      {status === "authenticated" && (
        <Avatar
          src={session.user!.image!}
          fallback="?"
          radius="full"
          size={"2"}
          referrerPolicy="no-referrer"
        />
      )}
      {status === "unauthenticated" && (
        <Link href={"/api/auth/signin"}>Sign In</Link>
      )}
      {status === "loading" && <Spinner />}
    </Box>
  );
};

export default AccessingAvatar;
