import { useEffect, useState } from "react";

import { useQuery } from "react-query";

import { useUserActions } from "./authService";
import { getUserByUsername } from "api";
import { User } from "./types";

export const useAuth = () => {
  const [user, setUser] = useState<User | null>();
  const { auth } = useUserActions();

  const { data: userResponseData } = useQuery(
    "user",
    () => getUserByUsername(auth?.sub || ""),
    {
      enabled: !!auth?.sub,
    }
  );

  useEffect(() => {
    userResponseData && setUser(userResponseData.data);
  }, [userResponseData]);

  return user;
};
