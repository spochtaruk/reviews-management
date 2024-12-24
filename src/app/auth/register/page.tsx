import React from "react";
import { AuthForm } from "@/components";

export default function RegisterPage() {
  return (
    <div className="p-4 max-w-6xl mx-auto flex flex-col items-center gap-10">
      <h1 className="text-3xl font-semibold text-center ">Register</h1>
      <AuthForm type="register" />
    </div>
  );
}
