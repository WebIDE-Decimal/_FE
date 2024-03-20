import React, { useState } from "react";
import { AxiosResponse } from "axios";
import api from "./index";

const API_BASE_URL = "/users";

interface SignUpRequestDTO {
  email: string;
  nickname: string;
  password: string;
}
interface LoginRequestDTO {
  email: string;
  password: string;
}

interface LoginResponse {
  id: number;
  email: string;
  nickname: string;
  profileFilename: string;
  profileFilepath: string;
}

interface Member {
  email: string;
  nickname: string;
  authority: string;
}

export const getMemberProfile = async (): Promise<Member> => {
  const response: AxiosResponse<Member> = await api.post(
    `${API_BASE_URL}/memberProfile`
  );
  return response.data;
};

export const signUp = async (
  signUpRequestDTO: SignUpRequestDTO
): Promise<string> => {
  try {
    const response: AxiosResponse<string> = await api.post(
      `${API_BASE_URL}/signup`,
      signUpRequestDTO
    );
    window.location.href = "/login";

    return response.data;
  } catch (error) {
    if (error) {
      throw new Error("1. An unexpected error occurred");
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};

export const reissueTokens = async (): Promise<void> => {
  try {
    const response: AxiosResponse = await api.post(
      `/reissue`,
      {},
      { withCredentials: true }
    );
    const newAccessToken = response.headers["access_token"];

    console.log("New access token:", newAccessToken);

    api.defaults.headers.common["Authorization"] = `Bearer ${newAccessToken}`;
  } catch (error) {
    throw new Error("An unexpected error occurred during token reissue");
  }
};

export const logout = async (): Promise<void> => {
  try {
    await api.post(`/logout`, {});
    localStorage.removeItem("access_token");

    console.log("Logged out successfully");
    window.location.href = "/login";
  } catch (error) {
    console.error("Logout failed:", error);
  }
};

export const useLogin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = async (credentials: LoginRequestDTO) => {
    try {
      const response: AxiosResponse<LoginResponse> = await api.post(
        `/login`,
        credentials
      );
      localStorage.setItem("access_token", response.headers.access_token);
      setIsLoggedIn(true);
      console.log("Login successful");
      window.location.href = "/";
    } catch (error) {
      console.error("Login failed:", error);
      setIsLoggedIn(false);
    }
  };

  return { isLoggedIn, login };
};
