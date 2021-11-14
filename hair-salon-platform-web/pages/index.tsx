import { useState } from "react";
import type { NextPage } from "next";
import { Dayjs } from "dayjs";

import {
  Button,
  Card,
  Box,
  Typography,
  IconButton,
  Tooltip,
} from "@mui/material";
import { Add, ChevronLeft, ChevronRight } from "@mui/icons-material";
import DatePicker from "@mui/lab/DatePicker";

import dayjs from "lib/dayjs";
import { generateSlots } from "lib/helpers";
import { slotsConfig } from "lib/constants";
import styles from "./styles.module.scss";

const calcTop = (start: string) => {
  const startDate = dayjs(start, "HH:mm");
  const dayStartDate = dayjs(`${slotsConfig.start}: 00`, "HH");

  const diff = startDate.diff(dayStartDate, "minutes");

  return diff * (slotsConfig.slotHeight / 60) + slotsConfig.slotHeight / 2;
};

const calcHeight = (start: string, end: string) => {
  const startDate = dayjs(start, "HH:mm");
  const endDate = dayjs(end, "HH:mm");

  const diff = endDate.diff(startDate, "minutes");

  return diff * (slotsConfig.slotHeight / 60);
};

const reservations = [
  {
    name: "Petar",
    surname: "Peric",
    category: "Sisanje",
    start: "08:15",
    end: "09:00",
    id: "1",
  },
  {
    name: "Sandra",
    surname: "Todorovic",
    category: "Sisanje",
    start: "12:00",
    end: "13:30",
    id: "2",
  },
];

const Home: NextPage = () => {
  const [date, setDate] = useState<Dayjs | null>(dayjs());
  const slots = generateSlots();

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.controls}>
          <Typography className={styles.title} variant="h5">
            Rezervacije
          </Typography>
          <div className={styles.dateActions}>
            <Tooltip title="Prethodni dan">
              <IconButton>
                <ChevronLeft />
              </IconButton>
            </Tooltip>
            <DatePicker
              renderInput={({ inputRef, inputProps, InputProps }) => (
                <Box
                  className={styles.datePicker}
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <input
                    className={styles.datePickerInput}
                    ref={inputRef}
                    {...inputProps}
                  />
                  {InputProps?.endAdornment}
                </Box>
              )}
              inputFormat="dddd, DD.MM.YYYY"
              onChange={(value) => setDate(value)}
              value={date}
            />
            <Tooltip title="Sledeći dan">
              <IconButton>
                <ChevronRight />
              </IconButton>
            </Tooltip>
          </div>
          <Button variant="contained" endIcon={<Add />}>
            Dodaj
          </Button>
        </div>
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
            {reservations.map((reservation) => (
              <Card
                sx={{ p: 1 }}
                style={{
                  top: calcTop(reservation.start),
                  height: calcHeight(reservation.start, reservation.end),
                }}
                className={styles.reservation}
                key={reservation.id}
              >
                <Typography variant="h6">
                  {reservation.name} {reservation.surname}
                </Typography>
                <Typography variant="body1">
                  {reservation.start} - {reservation.end}
                </Typography>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
