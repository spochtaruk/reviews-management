import { AuthResponse, LoginDto, RegisterDto } from "@/types";
import { api } from "@/utils";

export const register = async (registerDto: RegisterDto): Promise<void> => {
  await api.post<RegisterDto>("/auth/register", registerDto);
};

export const login = async (loginDto: LoginDto): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>("/auth/login", loginDto);

  if (response.data?.accessToken) {
    localStorage.setItem("accessToken", response.data.accessToken);
  }

  return response.data;
};
