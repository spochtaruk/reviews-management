"use client";
import React, { useEffect } from "react";
import { Button } from "@nextui-org/react";
import { useUserStore } from "@/store/userStore";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { getUser } from "@/services/userService";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

const Header: React.FC = () => {
  const { user, clearUser, setUser } = useUserStore();
  const router = useRouter();
  const currentPath = usePathname();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUser();
        setUser(userData);
      } catch (error: unknown) {
        if (error instanceof AxiosError) {
          toast.error(error.response?.data?.message || "Error fetching user");
        } else {
          toast.error("Error fetching user: " + error);
        }
      }
    };

    if (
      !user &&
      currentPath !== "/auth/login" &&
      currentPath !== "/auth/register"
    ) {
      fetchUser();
    }
  }, [user, setUser, currentPath]);

  const handleLogout = () => {
    clearUser();
    localStorage.removeItem("accessToken");
    router.push("/auth/login");
  };

  if (currentPath === "/auth/login" || currentPath === "/auth/register") {
    return (
      <header className="flex justify-center items-center p-4 bg-gray-800 text-white">
        <Link href="/">
          <div className="text-2xl font-semibold">Reviews</div>
        </Link>
      </header>
    );
  }

  return (
    <header className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <Link href="/">
        <div className="text-2xl font-semibold">Reviews</div>
      </Link>

      <div className="flex items-center gap-4">
        {!user ? (
          <>
            <Link href="/auth/login">
              <Button color="primary">Login</Button>
            </Link>
            <Link href="/auth/register">
              <Button color="secondary">Register</Button>
            </Link>
          </>
        ) : (
          <>
            <span className="text-lg">Hello, {user.username}</span>
            <Button color="danger" onPress={handleLogout}>
              Logout
            </Button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
