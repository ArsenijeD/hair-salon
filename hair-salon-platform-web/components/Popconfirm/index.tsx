import {
  FC,
  cloneElement,
  isValidElement,
  useState,
  SyntheticEvent,
} from "react";

import { Button, Card, Typography, Popper } from "@mui/material";

import ClickAwayListener from "@mui/core/ClickAwayListener";

const Popconfirm: FC<{ onConfirm: () => void }> = ({ children, onConfirm }) => {
  const [anchorEl, setAnchorEl] = useState<any>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: SyntheticEvent) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  if (isValidElement(children)) {
    return (
      <>
        {cloneElement(children, { onClick: handleClick })}
        <Popper
          anchorEl={anchorEl}
          placement="top"
          style={{ zIndex: 2000 }}
          onClick={(e) => e.stopPropagation()}
          open={open}
        >
          <ClickAwayListener onClickAway={handleClose}>
            <Card sx={{ p: 2 }}>
              <Typography variant="body1" sx={{ mb: 2 }}>
                Potvrdite da želite da obrišete
              </Typography>
              <Button
                size="small"
                variant="outlined"
                onClick={handleClose}
                sx={{ mr: 1 }}
              >
                Otkaži
              </Button>
              <Button
                size="small"
                variant="contained"
                color="error"
                onClick={onConfirm}
              >
                Obriši
              </Button>
            </Card>
          </ClickAwayListener>
        </Popper>
      </>
    );
  }

  return <>{children}</>;
};

export default Popconfirm;
