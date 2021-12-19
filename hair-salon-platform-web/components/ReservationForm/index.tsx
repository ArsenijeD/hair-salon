import { FC, useEffect, useRef, useState } from "react";

import {
  Typography,
  Button,
  MenuItem,
  Box,
  Alert,
  TextField as MuiTextField,
  AutocompleteRenderOptionState,
  AutocompleteRenderInputParams,
} from "@mui/material";
import { DeleteOutline } from "@mui/icons-material";
import { useRecoilState, useRecoilValue } from "recoil";
import { Field, Form, Formik, useFormikContext, FormikProps } from "formik";
import { TextField, Autocomplete } from "formik-mui";
import * as yup from "yup";
import { useQueryClient, useMutation, useQuery } from "react-query";

import UserForm from "../UserForm";
import Popconfirm from "../Popconfirm";

import { createReservation, deleteReservation, getCustomers } from "api";
import { generateSlots } from "lib/helpers";
import { slotsConfig, TypeOfService, TYPES_OF_SERVICE } from "lib/constants";
import { Reservation, User, CustomersResponse } from "lib/types";
import dayjs from "lib/dayjs";
import { dateState, editState, userState } from "../Reservations/state";
import styles from "./styles.module.scss";

const validationSchema = yup.object({
  typeOfService: yup.string().required("Izaberi tip usluge"),
  customer: yup.object().required("Izaberi musteriju").nullable(),
  startTime: yup.string().required("Pocetno vreme je obavezno"),
  endTime: yup
    .string()
    .required("Krajnje vreme je obavezno")
    .test(
      "posle-pocetnog",
      "Krajnje vreme mora biti posle pocetnog",
      function (value) {
        const { startTime } = this.parent;
        return dayjs(value, "HH:mm").isAfter(dayjs(startTime, "HH:mm"));
      }
    ),
});

const EndTimeField: FC<{ startSlots: string[] }> = ({ startSlots }) => {
  const {
    values: { startTime },
    setFieldValue,
  } = useFormikContext<NewReservation>();

  useEffect(() => {
    if (startTime) {
      const end = dayjs(startTime, "HH:mm").add(15, "m").format("HH:mm");
      setFieldValue("endTime", end);
    }
  }, [startTime, setFieldValue]);

  return (
    <Field
      disabled={false}
      component={TextField}
      label="Kraj"
      name="endTime"
      select
    >
      {startSlots.map((slot) => (
        <MenuItem key={slot} value={slot}>
          {slot}
        </MenuItem>
      ))}
    </Field>
  );
};

interface NewReservation {
  customer: User | null;
  startTime: string;
  endTime: string;
  typeOfService: TypeOfService;
  worker: User | null;
}

interface ReservationFormProps {
  onSuccess?: (data: Reservation) => void;
  onClose: () => void;
}
const ReservationForm: FC<ReservationFormProps> = ({ onSuccess, onClose }) => {
  const queryClient = useQueryClient();

  const date = useRecoilValue(dateState);
  const user = useRecoilValue(userState);
  const [editReservation, setEditReservation] = useRecoilState(editState);

  const form = useRef<FormikProps<NewReservation>>(null);
  const [showUserForm, setShowUserForm] = useState(false);
  const [apiError, setApiError] = useState(false);

  const initialValues = (): NewReservation => {
    if (editReservation) {
      return {
        customer: editReservation.customer,
        startTime: dayjs(editReservation.date).format("HH:mm"),
        endTime: dayjs(editReservation.date)
          .add(editReservation.durationMinutes, "m")
          .format("HH:mm"),
        typeOfService: editReservation.typeOfService,
        worker: editReservation.worker,
      };
    } else {
      return {
        customer: null,
        startTime: "12:00",
        endTime: "12:30",
        typeOfService: TypeOfService.Haircut,
        worker: user,
      };
    }
  };

  const startSlots = generateSlots({
    ...slotsConfig,
    interval: 15,
  });

  // React-query
  const { mutate } = useMutation(
    (values: any) => {
      return createReservation(values);
    },
    {
      onSuccess: (res) => {
        const reservation = res.data as Reservation;

        queryClient.invalidateQueries([
          "reservations",
          reservation.worker.id,
          date?.toISOString(),
        ]);
        onSuccess?.(reservation);
      },
      onError: () => {
        setApiError(true);
      },
    }
  );

  const onSubmit = async (values: NewReservation) => {
    // Has to be +1 for dayjs
    const hour = Number(values.startTime.split(":")[0]) + 1;
    const minut = Number(values.startTime.split(":")[1]);

    const durationMinutes = dayjs(values.endTime, "HH:mm").diff(
      dayjs(values.startTime, "HH:mm"),
      "minute"
    );

    const data = {
      customer: values.customer,
      date: dayjs(date).hour(hour).minute(minut).second(0).toISOString(),
      durationMinutes,
      typeOfService: values.typeOfService,
      worker: user,
    };

    if (editReservation) {
      console.log(data);
      return;
    }

    return await mutate(data);
  };

  const onUserFormChange = (user?: User) => {
    user && form.current?.setFieldValue("customer", user);
    setShowUserForm(false);
  };

  // Delete reservatino
  const { mutate: handleDelete } = useMutation(
    (reservation: Reservation) => {
      return deleteReservation(reservation.id);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([
          "reservations",
          editReservation?.worker.id,
          date?.toISOString(),
        ]);
      },
    }
  );

  const { data: customersData } = useQuery<CustomersResponse>(
    "customers",
    getCustomers
  );

  return (
    <>
      <div className={styles.container}>
        <div
          className={styles.userForm}
          style={{ visibility: showUserForm ? "visible" : "hidden" }}
        >
          <UserForm onChange={onUserFormChange} />
        </div>
        {apiError && (
          <Alert
            sx={{ mb: 1 }}
            severity="error"
            onClose={() => setApiError(false)}
          >
            Greška, vremenski period nije slobodan
          </Alert>
        )}
        <Typography variant="h4">
          {editReservation ? "Izmeni podatke" : "Nova rezervacija"}
        </Typography>
        <Typography variant="h6" sx={{ marginBottom: 2 }}>
          {date?.format("dddd, DD.MM.YYYY")}
        </Typography>

        <Formik
          innerRef={form}
          initialValues={initialValues()}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ values, handleChange, isSubmitting, isValid, setFieldValue }) => (
            <Form className={styles.form}>
              <Box mb={3}>
                <Button
                  sx={{ mb: 2 }}
                  variant="outlined"
                  onClick={() => setShowUserForm(true)}
                >
                  Dodaj novu mušteriju
                </Button>

                <Field
                  component={Autocomplete}
                  options={customersData?.data || []}
                  getOptionLabel={(option: User) =>
                    `${option.firstName} ${option.lastName}, ${option.phoneNumber}`
                  }
                  renderInput={(params: AutocompleteRenderInputParams) => (
                    <MuiTextField {...params} label="Izaberi mušteriju" />
                  )}
                  renderOption={(
                    props: AutocompleteRenderOptionState,
                    option: User
                  ) => {
                    return (
                      <Box component="li" {...props}>
                        {option.firstName} {option.lastName} <br />{" "}
                        {option.phoneNumber}
                      </Box>
                    );
                  }}
                  name="customer"
                  label="Izaberi mušteriju"
                ></Field>
              </Box>
              <Box
                marginBottom={3}
                sx={{
                  "& > :not(style)": { mr: 1, width: "150px" },
                }}
              >
                <Field
                  component={TextField}
                  disabled={false}
                  label="Početak"
                  name="startTime"
                  select
                >
                  {startSlots.map((slot) => (
                    <MenuItem key={slot} value={slot}>
                      {slot}
                    </MenuItem>
                  ))}
                </Field>
                <EndTimeField startSlots={startSlots} />
              </Box>

              <Box marginBottom={2}>
                <Field
                  component={TextField}
                  select
                  disabled={false}
                  label="Tip usluge"
                  name="typeOfService"
                >
                  {Object.keys(TYPES_OF_SERVICE).map((key) => (
                    <MenuItem key={key} value={key}>
                      {TYPES_OF_SERVICE[key]}
                    </MenuItem>
                  ))}
                </Field>
              </Box>

              <Button
                size="large"
                color="primary"
                variant="contained"
                type="submit"
                sx={{ mr: 2, minWidth: 200 }}
              >
                {editReservation ? "Sačuvaj izmene" : "Kreiraj"}
              </Button>
              {editReservation && (
                <Popconfirm
                  onConfirm={() => {
                    handleDelete(editReservation);
                    onClose();
                  }}
                >
                  <Button variant="outlined" size="large" color="error">
                    <DeleteOutline />
                  </Button>
                </Popconfirm>
              )}
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default ReservationForm;
