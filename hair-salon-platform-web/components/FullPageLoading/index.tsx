import { FC } from "react";

import { CircularProgress } from "@mui/material";

import styles from "./styles.module.scss";

const FullPageLoading: FC = () => {
  return (
    <div className={styles.loadingScreen}>
      <CircularProgress />
    </div>
  );
};

export default FullPageLoading;
