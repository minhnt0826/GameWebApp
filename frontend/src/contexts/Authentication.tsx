import { UseMutationResult, useMutation } from "@tanstack/react-query";
import React, { useState } from "react";

interface AuthState {
  isLoggedIn: boolean;
  userId: number | null;
  login: UseMutationResult<void, unknown, void, unknown>;
}
const AuthStateContext = React.createContext<AuthState>({} as AuthState);

interface Props {
  children: React.ReactNode;
}

export default function AuthStateContextProvider({ children }: Props) {
  const [userId, setUserId] = useState<number | null>(null);
  const [isLoggedIn, setisLoggedIn] = useState(false);

  const loginMutation = useMutation({
    mutationFn: async () => {
      setisLoggedIn(true);
      setUserId(2);
    },
  });

  return (
    <AuthStateContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        userId: userId,
        login: loginMutation,
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
