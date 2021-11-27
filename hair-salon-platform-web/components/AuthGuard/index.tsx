import { FC, useCallback, useEffect } from "react";

import { useRouter } from "next/router";

import FullPageLoading from "@/components/FullPageLoading";

import { apiClient, getUserByUsername } from "api";
import { routerPaths } from "lib/constants";
import { useUserActions, getToken } from "lib/authService";
import { useQuery } from "react-query";

const AuthGuard: FC = ({ children }) => {
  const router = useRouter();
  const { auth, logoutUser, isLoading } = useUserActions();
  const token = getToken();
  useQuery("user", () => getUserByUsername(auth?.sub || ""), {
    enabled: !!auth?.sub,
  });

  useEffect(() => {
    apiClient.interceptors.request.use(async (config) => {
      if (process.browser) {
        // Logout if token expired
        if (auth && Date.now() >= auth.exp * 1000) {
          logoutUser();
          return;
        }

        if (token) {
          return {
            ...config,
            headers: {
              ...config.headers,
              ["Authorization"]: `Bearer ${token}`,
            },
          };
        }
      }

      return config;
    });
  }, [auth, token, logoutUser]);

  useEffect(() => {
    if (auth && router.pathname === routerPaths.LOGIN) {
      router.push(routerPaths.HOME);
    }
    if (!isLoading && !auth && router.pathname !== routerPaths.LOGIN) {
      router.push(routerPaths.LOGIN);
    }
  }, [auth, router, isLoading]);

  if ((isLoading || !auth) && router.pathname !== routerPaths.LOGIN) {
    return <FullPageLoading />;
  }

  return <>{children}</>;
};

export default AuthGuard;
