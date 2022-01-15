import { FC } from "react";

import Link from "next/link";
import { useRouter } from "next/router";

import Button from "@mui/material/Button";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Avatar from "@mui/material/Avatar";

import styles from "./styles.module.scss";
import { useRecoilState } from "recoil";
import { authState } from "../AuthGuard/state";
import { Typography } from "@mui/material";

function LinkTab(props: any) {
  return (
    <Link href={props.href} passHref>
      <Tab component="a" {...props} />
    </Link>
  );
}

const Layout: FC = ({ children }) => {
  const router = useRouter();
  const [auth, setAuth] = useRecoilState(authState);
  const { user, isAdmin } = auth;

  function logoutUser() {
    localStorage.removeItem("userToken");
    setAuth((oldAuth) => ({
      ...oldAuth,
      user: null,
      jwt: null,
      decoded: null,
    }));
  }

  return (
    <div className={styles.layout}>
      {user && (
        <nav className={styles.navigationBar}>
          <div className={styles.logoWrapper}>
            <span className={styles.logo}>Just Hair</span>
          </div>
          <Tabs
            aria-label="Navigacija"
            orientation="vertical"
            value={router.pathname}
          >
            <LinkTab label="Rezervacije" value="/" href="/" />
            {isAdmin && (
              <LinkTab label="Usluge" value="/usluge" href="/usluge" />
            )}
            {isAdmin && (
              <LinkTab label="Radnici" value="/radnici" href="/radnici" />
            )}
            <LinkTab label="Mušterije" value="/musterije" href="/musterije" />
          </Tabs>
          <div className={styles.user}>
            <Avatar sx={{ mr: 1 }}>{user.firstName[0]}</Avatar>
            <span>
              <Typography variant="caption">
                {user.firstName} {user.lastName}
              </Typography>
              <br />
              <Typography
                variant="caption"
                sx={{
                  cursor: "pointer",
                  color: "primary.dark",
                }}
                onClick={() => logoutUser()}
              >
                Odjavi se
              </Typography>
            </span>
          </div>
        </nav>
      )}
      <main className={styles.page}>{children}</main>
    </div>
  );
};

export default Layout;
