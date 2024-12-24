import { api } from "@/utils";
import { User } from "@/types";

export const getUser = async (): Promise<User> => {
  try {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      throw new Error("No token found");
    }

    const response = await api.get("/users/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};
