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
  Divider,
} from "@mui/material";
import { Add, ChevronLeft, ChevronRight } from "@mui/icons-material";
import DatePicker from "@mui/lab/DatePicker";
import { useSetRecoilState, useRecoilState, useRecoilValue } from "recoil";

import { getReservations, getWorkers } from "api";
import { dateState, formState, userState } from "../state";

import { authState } from "@/components/AuthGuard/state";

import styles from "./styles.module.scss";
import { User } from "lib/types";

const Header: FC = () => {
  const [date, setDate] = useRecoilState(dateState);
  const [user, setUser] = useRecoilState(userState);
  const authUser = useRecoilValue(authState).user;
  const setFormVisible = useSetRecoilState(formState);

  useEffect(() => {
    authUser && setUser(authUser);
  }, [authUser, setUser]);

  const { data } = useQuery(
    ["reservations", user?.id, date?.toISOString()],
    () => getReservations(user?.id || 1, date?.toISOString?.() || ""),
    { enabled: !!user?.id && !!date }
  );
  const reservationsCount = data?.data.length;

  const { data: workersData, isLoading: isLoadingWorkers } = useQuery(
    "workers",
    () => getWorkers()
  );

  return (
    <div className={styles.header}>
      <Box className={styles.titleContainer}>
        <Badge badgeContent={reservationsCount} color="primary">
          <Typography className={styles.title} variant="h6">
            Rezervacije
          </Typography>
        </Badge>
      </Box>
      {/* <Divider orientation="vertical" flexItem sx={{ ml: 1, mr: 1 }} /> */}
      {user && (
        <Select
          disabled={isLoadingWorkers}
          classes={{ outlined: styles.workerSelect }}
          variant="outlined"
          onChange={(e) =>
            setUser(
              workersData?.data.find(
                (worker) => worker.id === Number(e.target.value)
              ) as User
            )
          }
          value={user.id}
        >
          {workersData?.data.map((worker) => (
            <MenuItem key={worker.id} value={worker.id}>
              {worker.firstName} {worker.lastName}
            </MenuItem>
          ))}
        </Select>
      )}
      {/* <Divider orientation="vertical" flexItem sx={{ ml: 1, mr: 1 }} /> */}
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
          Napravi Rezervaciju
        </Button>
      </Box>
    </div>
  );
};

export default Header;
