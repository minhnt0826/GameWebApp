import { UseMutationResult, useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import backendClient from "../services/backendClient";
import { LoginInfo } from "../pages/LoginPage";

interface AuthState {
  isLoggedIn: boolean;
  userId: number | null;
  login: UseMutationResult<null | undefined, unknown, LoginInfo, unknown>;
  register: UseMutationResult<null | undefined, unknown, LoginInfo, unknown>;
  signout: () => void;
}
const AuthStateContext = React.createContext<AuthState>({} as AuthState);

interface Props {
  children: React.ReactNode;
}

interface LoginRegisterResponse {
  id: number;
}
export default function AuthStateContextProvider({ children }: Props) {
  const [userId, setUserId] = useState<number | null>(null);
  const [isLoggedIn, setisLoggedIn] = useState(false);

  const loginMutation = useMutation({
    mutationKey: ["login"],
    mutationFn: login,
  });

  async function login(data: LoginInfo) {
    const response = await backendClient.post<LoginRegisterResponse>(
      "/users/login",
      data
    );

    console.log(response);

    if (response) {
      setUserId(response.data.id);
      setisLoggedIn(true);
    } else {
      setUserId(null);
      setisLoggedIn(false);
      return null;
    }
  }

  const registerMutation = useMutation({
    mutationKey: ["register"],
    mutationFn: register,
  });

  async function register(data: LoginInfo) {
    const response = await backendClient.post<LoginRegisterResponse>(
      "/users/register",
      data
    );

    console.log(response);

    if (response) {
      setUserId(response.data.id);
      setisLoggedIn(true);
    } else {
      setUserId(null);
      setisLoggedIn(false);
      return null;
    }
  }

  function signout() {
    setUserId(null);
    setisLoggedIn(false);
  }

  return (
    <AuthStateContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        userId: userId,
        login: loginMutation,
        register: registerMutation,
        signout: signout,
      }}
    >
      {children}
    </AuthStateContext.Provider>
  );
}

export function useAuthState() {
  const context = React.useContext<AuthState>(AuthStateContext);
  if (context === undefined) {
    throw new Error("useAuthState must be used within a AuthProvider");
  }

  return context;
}
