export type RegisterDto = {
  username: string;
  password: string;
};

export type LoginDto = {
  username: string;
  password: string;
};

export type AuthResponse = {
  accessToken: string;
};
