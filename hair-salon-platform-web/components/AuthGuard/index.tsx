import { FC, useEffect } from "react";

import { useRouter } from "next/router";

import FullPageLoading from "@/components/FullPageLoading";

import { apiClient, getUserByUsername } from "api";
import { routerPaths } from "lib/constants";
import { useQuery } from "react-query";
import { useRecoilState } from "recoil";
import { authState } from "./state";

const AuthGuard: FC = ({ children }) => {
  const router = useRouter();

  // Auth State
  const [auth, setAuth] = useRecoilState(authState);
  const { user, decoded, jwt, loading } = auth;

  // Will fetch user if token is present
  const { data: userData } = useQuery(
    ["user", decoded?.sub],
    () => getUserByUsername(decoded?.sub || ""),
    {
      enabled: !!decoded,
    }
  );

  // Set user in recoil state and finish loading
  useEffect(() => {
    userData &&
      setAuth((oldAuth) => ({
        ...oldAuth,
        user: userData.data,
        loading: false,
      }));
  }, [userData, setAuth]);

  // Remove loading if token is invalid, and show Login
  useEffect(() => {
    if (!decoded) {
      setAuth((oldAuth) => ({
        ...oldAuth,
        loading: false,
      }));
    }
  }, [decoded, setAuth]);

  // Set Axios headers
  useEffect(() => {
    apiClient.interceptors.request.use(async (config) => {
      if (process.browser) {
        // Logout if token expired
        if (decoded && Date.now() >= decoded.exp * 1000) {
          localStorage.removeItem("userToken");
          setAuth((oldAuth) => ({
            ...oldAuth,
            user: null,
            jwt: null,
            decoded: null,
          }));
          return;
        }

        // Set Auth Headers
        if (decoded) {
          return {
            ...config,
            headers: {
              ...config.headers,
              ["Authorization"]: `Bearer ${jwt}`,
            },
          };
        }
      }

      return config;
    });
  }, [decoded, jwt, setAuth]);

  // Handle auth redirects and loading screen
  useEffect(() => {
    if (user && router.pathname === routerPaths.LOGIN) {
      router.push(routerPaths.HOME);
    }
    if (!loading && !user && router.pathname !== routerPaths.LOGIN) {
      router.push(routerPaths.LOGIN);
    }
  }, [user, router, loading]);

  if ((loading || !user) && router.pathname !== routerPaths.LOGIN) {
    return <FullPageLoading />;
  }

  return <>{children}</>;
};

export default AuthGuard;
