import { FC, useEffect, useRef } from "react";

import { useMutation, useQueryClient } from "react-query";
import cx from "clsx";
import { Grid, Card, Typography, IconButton } from "@mui/material";
import { Delete, Edit, TryOutlined } from "@mui/icons-material";

import Popconfirm from "@/components/Popconfirm";
import dayjs from "lib/dayjs";
import { Reservation } from "lib/types";
import { calcSlotTopOffset, calcSlotHeight } from "lib/helpers";
import styles from "./styles.module.scss";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { activeIdState, dateState, editState, formState } from "../state";
import { TYPES_OF_SERVICE } from "lib/constants";
import { deleteReservation } from "api";

interface ReservationCardProps {
  reservation: Reservation;
}

const ReservationCard: FC<ReservationCardProps> = ({ reservation }) => {
  const [activeId, setActiveId] = useRecoilState(activeIdState);
  const date = useRecoilValue(dateState);
  const setReservationEdit = useSetRecoilState(editState);
  const setShowForm = useSetRecoilState(formState);
  const ref = useRef<HTMLDivElement>(null);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (activeId === reservation.id) {
      ref.current?.scrollIntoView({ block: "center" });
      setActiveId(null);
    }
  }, [activeId, ref, reservation, setActiveId]);

  // Delete Reservation
  const { mutate: handleDelete } = useMutation(
    () => {
      return deleteReservation(reservation.id);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([
          "reservations",
          reservation.worker.id,
          date?.toISOString(),
        ]);
      },
    }
  );

  return (
    <Card
      ref={ref}
      style={{
        top: calcSlotTopOffset(dayjs(reservation.date).format("HH:mm")),
        height: calcSlotHeight(reservation.durationMinutes),
      }}
      onClick={() => {
        setReservationEdit(reservation);
        setShowForm(true);
      }}
      className={cx(styles.reservation, styles[reservation.typeOfService], {
        [styles.new]: activeId === reservation.id,
      })}
      key={reservation.id}
    >
      <Grid container>
        <Grid item xs>
          <Typography variant="h6">
            {reservation.customer.firstName} {reservation.customer.lastName},{" "}
            {TYPES_OF_SERVICE[reservation.typeOfService]},{" "}
            {dayjs(reservation.date).format("HH:mm")}
          </Typography>
        </Grid>
        <Grid item>
          <IconButton size="small">
            <Edit />
          </IconButton>
          <Popconfirm onConfirm={handleDelete}>
            <IconButton size="small">
              <Delete />
            </IconButton>
          </Popconfirm>
        </Grid>
      </Grid>
    </Card>
  );
};

export default ReservationCard;
