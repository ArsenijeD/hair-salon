import { FC } from "react";

import isEmpty from "lodash/isEmpty";
import { CircularProgress } from "@mui/material";
import { useQuery } from "react-query";

import EmptyState from "../EmptyState";
import ReservationCard from "../ReservationCard";

import { Reservation } from "lib/types";

interface ReservationsListingProps {
  reservations: Reservation[];
}

const ReservationsListing: FC<ReservationsListingProps> = ({
  reservations,
}) => {
  return (
    <>
      {reservations?.map((reservation) => (
        <ReservationCard key={reservation.id} reservation={reservation} />
      ))}
    </>
  );
};

export default ReservationsListing;
