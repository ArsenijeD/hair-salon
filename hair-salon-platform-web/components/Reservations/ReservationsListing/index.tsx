import { FC } from "react";

import { CircularProgress } from "@mui/material";
import { useQuery } from "react-query";

import { getReservations } from "api";
import ReservationCard from "../ReservationCard";

import styles from "./styles.module.scss";

interface ReservationsListingProps {
  workerId: number;
  date: string;
}

const ReservationsListing: FC<ReservationsListingProps> = ({
  workerId,
  date,
}) => {
  console.log(workerId);
  const { data, isLoading } = useQuery(["reservations", workerId, date], () =>
    getReservations(workerId, date)
  );

  const reservations = data?.data;

  if (isLoading) {
    return (
      <div className={styles.loader}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <>
      {reservations?.map((reservation) => (
        <ReservationCard key={reservation.id} reservation={reservation} />
      ))}
    </>
  );
};

export default ReservationsListing;
