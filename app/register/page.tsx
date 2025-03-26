import React from "react";
import RegisterForm from "./RegisterForm";
import { Metadata } from "next";

const RegisterPage = () => {
  return (
    <div>
      <RegisterForm />
    </div>
  );
};

export const metadata: Metadata = {
  title: "Register | Create Your Account",
  description:
    "Join our platform to access customer management tools. Register for an account to start organizing your client relationships efficiently.",
};

export default RegisterPage;
