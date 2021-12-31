import { FC } from "react";

import { Box, CircularProgress } from "@mui/material";

import styles from "./styles.module.scss";

const Loading: FC = () => {
  return (
    <Box className={styles.loader}>
      <CircularProgress />
    </Box>
  );
};

export default Loading;
