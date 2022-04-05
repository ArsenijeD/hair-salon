import { FC, useEffect } from "react";

import { useQuery } from "react-query";
import {
  Button,
  Box,
  Typography,
  IconButton,
  Tooltip,
  Badge,
  Select,
  MenuItem,
} from "@mui/material";
import { Add, ChevronLeft, ChevronRight } from "@mui/icons-material";
import DatePicker from "@mui/lab/DatePicker";
import { useSetRecoilState, useRecoilState, useRecoilValue } from "recoil";

import { getReservations, getWorkers } from "api";
import { dateState, formState, workerState } from "../state";

import { authState } from "@/components/AuthGuard/state";

import styles from "./styles.module.scss";
import { User } from "lib/types";

const Header: FC = () => {
  const [date, setDate] = useRecoilState(dateState);
  const [worker, setWorker] = useRecoilState(workerState);
  const auth = useRecoilValue(authState);
  const authUser = auth.user;
  const isAdmin = auth.isAdmin;
  const setFormVisible = useSetRecoilState(formState);

  const { data } = useQuery(
    ["reservations", worker?.id, date?.toISOString()],
    () => getReservations(worker?.id || 1, date?.toISOString?.() || ""),
    { enabled: !!worker?.id && !!date && isAdmin }
  );
  const reservationsCount = data?.data.length;

  const { data: workersData, isLoading: isLoadingWorkers } = useQuery(
    "workers",
    getWorkers
  );

  // Set default worker in Select
  useEffect(() => {
    if (authUser && workersData) {
      const initalUser = workersData.data.find(
        (worker) => worker.id === authUser.id
      );
      // Set default if not allready selected
      !worker && setWorker(initalUser ? initalUser : workersData.data[0]);
    }
  }, [authUser, worker, workersData, setWorker]);

  return (
    <div className={styles.header}>
      <Box className={styles.titleContainer}>
        <Badge badgeContent={reservationsCount} color="primary">
          <Typography className={styles.title} variant="h6">
            Izveštaj
          </Typography>
        </Badge>
      </Box>
      {isAdmin && worker ? (
        <Select
          disabled={isLoadingWorkers}
          placeholder="Izaberi radnika"
          classes={{ outlined: styles.workerSelect }}
          variant="outlined"
          onChange={(e) =>
            setWorker(
              workersData?.data.find(
                (worker) => worker.id === Number(e.target.value)
              ) as User
            )
          }
          value={worker.id}
        >
          {workersData?.data.map((worker) => (
            <MenuItem key={worker.id} value={worker.id}>
              {worker.firstName} {worker.lastName}
            </MenuItem>
          ))}
        </Select>
      ) : (
        <span></span>
      )}
      <Box className={styles.datePickerContainer}>
        <Tooltip title="Prethodni dan">
          <IconButton
            onClick={() => {
              date && setDate(date.subtract(1, "day"));
            }}
          >
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
          <IconButton
            onClick={() => {
              date && setDate(date.add(1, "day"));
            }}
          >
            <ChevronRight />
          </IconButton>
        </Tooltip>
      </Box>

      <Box
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Button
          onClick={() => setFormVisible(true)}
          variant="contained"
          endIcon={<Add />}
        >
          Dodaj stavku
        </Button>
      </Box>
    </div>
  );
};

export default Header;
