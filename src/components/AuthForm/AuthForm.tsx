"use client";
import React from "react";
import { Form, Input, Button } from "@nextui-org/react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { AxiosError } from "axios";
import { login, register } from "@/services/authService";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const validationSchema = Yup.object({
  username: Yup.string().required("Please enter a valid username"),
  password: Yup.string()
    .required("Please enter a valid password")
    .min(6, "Password must be at least 6 characters"),
});

type AuthFormProps = {
  type: "login" | "register";
};

function AuthForm({ type }: AuthFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const router = useRouter();

  const handleAuthSubmit = async (data: {
    username: string;
    password: string;
  }) => {
    try {
      if (type === "register") {
        await register(data);
        toast.success("Registration successful! Please log in.");

        router.push("/auth/login");
      } else {
        const response = await login(data);
        console.log("Login successful:", response);
        router.push("/");
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        if (error.response) {
          const errorMessage =
            error.response?.data?.message ||
            "An error occurred. Please try again.";
          toast.error(errorMessage);
        } else {
          toast.error("An error occurred. Please try again.");
        }
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <Form
      className="w-full max-w-xs flex flex-col gap-4"
      onSubmit={handleSubmit(handleAuthSubmit)}
    >
      <Controller
        name="username"
        control={control}
        render={({ field }) => (
          <Input
            isRequired
            {...field}
            errorMessage={errors.username?.message}
            label="Username"
            labelPlacement="outside"
            isInvalid={!!errors.username}
            placeholder="Enter your username"
            type="text"
          />
        )}
      />

      <Controller
        name="password"
        control={control}
        render={({ field }) => (
          <Input
            isRequired
            {...field}
            errorMessage={errors.password?.message}
            isInvalid={!!errors.password}
            label="Password"
            labelPlacement="outside"
            placeholder="Enter your password"
            type="password"
          />
        )}
      />

      <Button color="primary" type="submit" className="w-full">
        {type === "register" ? "Register" : "Login"}
      </Button>
    </Form>
  );
}

export default AuthForm;