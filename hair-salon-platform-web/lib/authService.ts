import { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { singletonHook } from "react-singleton-hook";
import { User } from "lib/types";

interface TokenData {
  sub: string;
  exp: number;
  iat: number;
}

type Token = TokenData | null;

interface UserActions {
  auth: Token;
  authenticateUser: (token: string) => void;
  isLoading: boolean;
  logoutUser: () => void;
}

const initialValues: UserActions = {
  auth: null,
  isLoading: true,
  authenticateUser: () => {
    return null;
  },
  logoutUser: () => {
    return null;
  },
};

const useUserActionsImpl = (): UserActions => {
  const [auth, setAuth] = useState<Token>(null);
  // https://theodorusclarence.com/blog/nextjs-redirect-no-flashing
  const [isLoading, setIsLoading] = useState(true);

  const authenticateUser = (token: string) => {
    const decoded = jwt_decode(token) as Token;
    // Update state
    setAuth(decoded);
    // Save token to local storage
    localStorage.setItem("userToken", token);
  };

  const logoutUser = () => {
    setAuth(null);
    localStorage.removeItem("userToken");
  };

  useEffect(() => {
    const user = getUserFromCache();
    setAuth(user);
    setIsLoading(false);
  }, []);

  return {
    auth,
    isLoading,
    authenticateUser,
    logoutUser,
  };
};

// This is to avoid using context provider
export const useUserActions = singletonHook(initialValues, useUserActionsImpl);

export const getUserFromCache = () => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("userToken");
    return token ? (jwt_decode(token) as Token) : null;
  }
  return null;
};

export function getToken() {
  if (typeof window !== "undefined") {
    return localStorage.getItem("userToken");
  }
  return null;
}
