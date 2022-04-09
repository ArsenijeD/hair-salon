import { FC, SyntheticEvent, useEffect, useState } from "react";

import { Button, Popover } from "@mui/material";

const MaterialsDetails: FC<{ finalizedServiceId: number }> = ({
  finalizedServiceId,
}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: SyntheticEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <Button aria-describedby={id} size="small" onClick={handleClick}>
        Detalji
      </Button>
      <Popover
        open={open}
        id={id}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        Prikaz used-materials...
      </Popover>
    </div>
  );
};

export default MaterialsDetails;
