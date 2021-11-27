import { FC } from "react";

import { useQuery } from "react-query";
import { Grid, Card, Typography, IconButton } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";

import dayjs from "lib/dayjs";
import { calcSlotTopOffset, calcSlotHeight } from "lib/helpers";
import { getReservations } from "api";
import styles from "./styles.module.scss";

interface ReservationsListingProps {
  workerId: number;
  date: string;
}

const ReservationsListing: FC<ReservationsListingProps> = ({
  workerId,
  date,
}) => {
  const { data, isLoading } = useQuery(["reservations", workerId, date], () =>
    getReservations(workerId, date)
  );

  const reservations = data?.data;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {reservations?.map((reservation: any) => (
        <Card
          sx={{ p: 1 }}
          style={{
            top: calcSlotTopOffset(dayjs(reservation.date).format("HH:mm")),
            height: calcSlotHeight(reservation.durationMinutes),
          }}
          className={styles.reservation}
          key={reservation.id}
        >
          <Grid container>
            <Grid item xs>
              <Typography variant="h6">
                {reservation.customer.firstName} {reservation.customer.lastName}
              </Typography>
              <Typography variant="body1">
                {dayjs(reservation.date).format("HH:mm")} -{" "}
                {dayjs(reservation.date)
                  .minute(reservation.durationMinutes)
                  .format("HH:mm")}
              </Typography>
            </Grid>
            <Grid item>
              <IconButton>
                <Edit />
              </IconButton>
              <IconButton>
                <Delete />
              </IconButton>
            </Grid>
          </Grid>
        </Card>
      ))}
    </>
  );
};

export default ReservationsListing;
