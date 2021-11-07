import { FC, useEffect } from "react";

import { useRouter } from "next/router";

import FullPageLoading from "@/components/FullPageLoading";

import { routerPaths } from "lib/constants";
import { useUserActions } from "lib/authService";

const AuthGuard: FC = ({ children }) => {
  const router = useRouter();
  const { auth, isLoading } = useUserActions();

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
