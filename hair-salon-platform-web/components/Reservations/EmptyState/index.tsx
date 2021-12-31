import { FC } from "react";

import { Typography, Button, Box } from "@mui/material";
import { useSetRecoilState } from "recoil";

import { formState } from "../state";

const EmptyState: FC = () => {
  const setShowForm = useSetRecoilState(formState);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        p: 4,
        height: "70vh",
      }}
    >
      <Typography variant="h5" sx={{ mb: 3 }}>
        Ne postoje rezervacije za ovaj dan.
      </Typography>
      <Button
        size="large"
        variant="contained"
        onClick={() => setShowForm(true)}
      >
        Napravi rezervaciju
      </Button>
    </Box>
  );
};

export default EmptyState;
