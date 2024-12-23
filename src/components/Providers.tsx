"use client";
import { ReactNode } from "react";
import { ToastContainer } from "react-toastify";
import { NextUIProvider } from "@nextui-org/react";

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <NextUIProvider>
      <ToastContainer
        position="bottom-left"
        autoClose={3000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnHover
        theme="light"
      />
      {children}
    </NextUIProvider>
  );
}
