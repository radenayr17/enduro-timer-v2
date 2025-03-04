import { useMutation } from "react-query";

import { api } from "@/services/api";

interface Login {
  username: string;
  password: string;
}

const AUTH_BASE_URL = "/auth";

const login = async (body: Login) => {
  const url = `/${AUTH_BASE_URL}/login`;
  const { data } = await api.post(url, body);

  return data;
};

export const useLogin = () => useMutation(login);

const refreshToken = async (token: string) => {
  const url = `/${AUTH_BASE_URL}/refresh-token`;
  const { data } = await api.post(url, { refreshToken: token });

  return data;
};

export const useRefreshToken = () => useMutation(refreshToken);
