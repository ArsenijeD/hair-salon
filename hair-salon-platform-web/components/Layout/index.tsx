import { FC } from "react";

import Link from "next/link";
import { useRouter } from "next/router";

import Button from "@mui/material/Button";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Avatar from "@mui/material/Avatar";

import { useUserActions } from "lib/authService";
import styles from "./styles.module.scss";

function LinkTab(props: any) {
  return (
    <Link href={props.href} passHref>
      <Tab component="a" {...props} />
    </Link>
  );
}

const Layout: FC = ({ children }) => {
  const router = useRouter();
  const { logoutUser, auth } = useUserActions();

  return (
    <>
      {auth && (
        <nav className={styles.navigationBar}>
          <div>HairSalon</div>
          <Tabs aria-label="Navigacija" value={router.pathname}>
            <LinkTab label="Rezervacije" value="/" href="/" />
            <LinkTab label="Troskovi" value="/troskovi" href="/troskovi" />
            <LinkTab
              label="Podesavanje"
              value="/podesavanje"
              href="/podesavanje"
            />
          </Tabs>
          <div className={styles.user}>
            <Avatar>{auth.sub[0]}</Avatar>
            <Button onClick={() => logoutUser()}>Logout</Button>
          </div>
        </nav>
      )}
      {children}
    </>
  );
};

export default Layout;
