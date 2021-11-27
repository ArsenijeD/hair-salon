import { useState } from "react";
import type { NextPage } from "next";
import { Dayjs } from "dayjs";

import Reservations from "@/components/Reservations";
import ReservationForm from "@/components/ReservationForm";

import {
  Button,
  Box,
  Typography,
  IconButton,
  Tooltip,
  Container,
  Drawer,
} from "@mui/material";
import { Add, ChevronLeft, ChevronRight } from "@mui/icons-material";
import DatePicker from "@mui/lab/DatePicker";

import dayjs from "lib/dayjs";
import styles from "./styles.module.scss";

const Home: NextPage = () => {
  const [date, setDate] = useState<Dayjs | null>(dayjs());
  const [showReservationForm, setShowReservationForm] = useState(false);

  return (
    <>
      <Container>
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
            <Button
              onClick={() => setShowReservationForm(true)}
              variant="contained"
              endIcon={<Add />}
            >
              Dodaj
            </Button>
          </div>
          <Reservations date={date?.toISOString()} />
        </main>
      </Container>
      <Drawer
        anchor="right"
        open={showReservationForm}
        onClose={() => setShowReservationForm(false)}
      >
        <ReservationForm date={date} />
      </Drawer>
    </>
  );
};

export default Home;
