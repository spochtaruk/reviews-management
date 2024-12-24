import axios from "axios";
import { useRouter } from "next/router";
import { useUserStore } from "@/store/userStore";

const apiInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api`,
});

apiInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error;
    const router = useRouter();
    const { clearUser } = useUserStore.getState();

    if (response && response.status === 401) {
      clearUser();
      localStorage.removeItem("accessToken");
      router.push("/auth/login");
    }
    return Promise.reject(error);
  }
);

export default apiInstance;
