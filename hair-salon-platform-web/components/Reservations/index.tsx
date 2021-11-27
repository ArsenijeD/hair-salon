import { FC } from "react";

import { Typography } from "@mui/material";

import { slots, slotsConfig } from "lib/constants";
import styles from "./styles.module.scss";
import { useAuth } from "lib/hooks";
import ReservationsListing from "./ReservationsListing";

interface ReservationsProps {
  date: string | undefined | null;
}

const Reservations: FC<ReservationsProps> = ({ date }) => {
  const workerId = useAuth()?.id;

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
          <ReservationsListing workerId={workerId} date={date} />
        )}
      </div>
    </div>
  );
};

export default Reservations;
