import { FC, useState, useEffect } from "react";

import Link from "next/link";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import clsx from "clsx";

import { IconButton, Typography } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Avatar from "@mui/material/Avatar";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

import { authState } from "../AuthGuard/state";
import styles from "./styles.module.scss";

function LinkTab(props: any) {
  return (
    <Link href={props.href} passHref>
      <Tab component="a" classes={{ root: styles.tab }} {...props} />
    </Link>
  );
}

const Layout: FC = ({ children }) => {
  const router = useRouter();
  const [auth, setAuth] = useRecoilState(authState);
  const [showMobileNav, setShowMobileNav] = useState(false);
  const { user, isAdmin } = auth;

  const logoutUser = () => {
    localStorage.removeItem("userToken");
    setAuth((oldAuth) => ({
      ...oldAuth,
      user: null,
      jwt: null,
      decoded: null,
    }));
  };

  const handleRouteChange = () => {
    setShowMobileNav(false);
  };

  useEffect(() => {
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <div className={styles.layout}>
      {user && (
        <>
          {/* Mobile Bar */}
          <div className={styles.mobileNav}>
            <span style={{ width: 40 }}></span>
            <div className={styles.logoWrapper}>
              <span className={styles.logo}>Just Hair</span>
            </div>
            <IconButton onClick={() => setShowMobileNav(!showMobileNav)}>
              {showMobileNav ? <CloseIcon /> : <MenuIcon />}
            </IconButton>
          </div>
          {/* Nav content */}
          <nav
            className={clsx(styles.navigationBar, {
              [styles.isVisible]: showMobileNav,
            })}
          >
            <div>
              <div className={styles.logoWrapper}>
                <span className={styles.logo}>Just Hair</span>
              </div>
              <Tabs
                aria-label="Navigacija"
                orientation="vertical"
                value={router.pathname}
              >
                <LinkTab label="Rezervacije" value="/" href="/" />
                <LinkTab label="Moj dan" value="/moj-dan" href="/moj-dan" />
                {isAdmin && (
                  <LinkTab label="Usluge" value="/usluge" href="/usluge" />
                )}
                {isAdmin && (
                  <LinkTab
                    label="Zarada radnika"
                    value="/procenti-usluga"
                    href="/procenti-usluga"
                  />
                )}
                {isAdmin && (
                  <LinkTab label="Radnici" value="/radnici" href="/radnici" />
                )}
                <LinkTab label="Klijenti" value="/klijenti" href="/klijenti" />
                <LinkTab
                  label="Materijali"
                  value="/materijali"
                  href="/materijali"
                />
              </Tabs>
            </div>
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
        </>
      )}
      <main className={styles.page}>{children}</main>
    </div>
  );
};

export default Layout;
