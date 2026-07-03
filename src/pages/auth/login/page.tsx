import React from "react";
import { AuthLayout } from "../components";
import { LoginForm } from "../components/login-form";

export const AuthLoginPage = () => {
  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  );
};
