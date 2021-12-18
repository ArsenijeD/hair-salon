import { atom } from "recoil";
import jwt_decode from "jwt-decode";

import { Auth, TokenDecoded } from "lib/types";

function getTokenData() {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("userToken");

    if (token) {
      const decoded = jwt_decode?.(token) as TokenDecoded;

      if (Date.now() <= decoded.exp * 1000) {
        return decoded;
      }
    }
  }
  return null;
}

function getJwt() {
  if (typeof window !== "undefined") {
    return localStorage.getItem("userToken");
  }
  return null;
}

export const authState = atom<Auth>({
  key: "auth",
  default: {
    user: null,
    loading: true,
    decoded: getTokenData(),
    jwt: getJwt(),
  },
});
