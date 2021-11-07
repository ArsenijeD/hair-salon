import { FC } from "react";

import styles from "./styles.module.scss";

const FullPageLoading: FC = () => {
  return (
    <div className={styles.loadingScreen}>
      <h1>Loading...</h1>
    </div>
  );
};

export default FullPageLoading;
