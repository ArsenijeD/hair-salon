import { FC } from "react";

import { Typography } from "@mui/material";

import { slots, slotsConfig } from "lib/constants";
import styles from "./styles.module.scss";
import ReservationsListing from "./ReservationsListing";
import { useRecoilValue } from "recoil";
import { dateState, workerState } from "./state";

const Reservations: FC = () => {
  const workerId = useRecoilValue(workerState)?.id;
  const date = useRecoilValue(dateState);

  return (
    <div className={styles.dataGrid}>
      <div className={styles.slotsContainer}>
        {slots.map((slot) => (
          <div
            className={styles.slot}
            style={{ height: slotsConfig.slotHeight }}
            key={slot}
          >
            <Typography
              variant="caption"
              color="GrayText"
              className={styles.slotTime}
            >
              {slot}
            </Typography>
            <span className={styles.line}></span>
          </div>
        ))}
        {workerId && date && (
          <ReservationsListing workerId={workerId} date={date.toISOString()} />
        )}
      </div>
    </div>
  );
};

export default Reservations;
