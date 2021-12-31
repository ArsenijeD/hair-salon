import { FC } from "react";

import { isEmpty } from "lodash";
import { Typography } from "@mui/material";
import { useQuery } from "react-query";
import { useRecoilValue } from "recoil";

import EmptyState from "./EmptyState";
import ReservationsListing from "./ReservationsListing";
import Loading from "../Loading";

import { dateState, workerState } from "./state";
import { slots, slotsConfig } from "lib/constants";
import { getReservations } from "api";
import styles from "./styles.module.scss";

const Reservations: FC = () => {
  const workerId = useRecoilValue(workerState)?.id;
  const date = useRecoilValue(dateState);

  const { data, isLoading } = useQuery(
    ["reservations", workerId, date],
    () => getReservations(workerId || 1, date?.toISOString() || ""),
    { enabled: !!workerId && !!date }
  );
  const reservations = data?.data;

  if (isLoading) {
    return <Loading />;
  }

  if (!reservations || isEmpty(reservations)) {
    return <EmptyState />;
  }

  return (
    <div className={styles.dataGrid}>
      <div className={styles.slotsContainer}>
        {slots.map((slot) => (
          <div
            className={styles.slot}
            style={{ height: slotsConfig.slotHeight }}
            key={slot}
          >
            <Typography className={styles.slotTime}>{slot}</Typography>
            <span className={styles.line}></span>
          </div>
        ))}
        <ReservationsListing reservations={reservations} />
      </div>
    </div>
  );
};

export default Reservations;
