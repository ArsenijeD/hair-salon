import { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { singletonHook } from "react-singleton-hook";
import { apiClient } from "api";
import { User } from "lib/types";

interface UserActions {
  auth: User;
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
  const [auth, setAuth] = useState<User>(null);
  // https://theodorusclarence.com/blog/nextjs-redirect-no-flashing
  const [isLoading, setIsLoading] = useState(true);

  const authenticateUser = (token: string) => {
    const decoded = jwt_decode(token) as User;
    // Update state
    setAuth(decoded);
    // Save token to local storage
    localStorage.setItem("userToken", token);
    // Set headers on axios client
    apiClient.defaults.headers.common["Authorization"] = `bearer ${token}`;
  };

  const logoutUser = () => {
    setAuth(null);
    localStorage.removeItem("userToken");
    delete apiClient.defaults.headers.common["Authorization"];
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
    return token ? (jwt_decode(token) as User) : null;
  }
  return null;
};
