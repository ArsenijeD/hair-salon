import { FC, useRef, useState } from "react";

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
import { Field, Form, Formik, FormikProps } from "formik";
import { TextField, Autocomplete } from "formik-mui";
import * as yup from "yup";
import { useQueryClient, useMutation, useQuery } from "react-query";

import UserForm from "../../Users/UserForm";
import Popconfirm from "../../Popconfirm";

import {
  createReservation,
  putReservation,
  deleteReservation,
  getCustomers,
  getWorkers,
} from "api";
import { generateSlots } from "lib/helpers";
import {
  slotsConfig,
  TypeOfService,
  TYPES_OF_SERVICE,
  ROLES,
} from "lib/constants";
import { Reservation, User, CustomersResponse } from "lib/types";
import dayjs from "lib/dayjs";
import { dateState, editState, workerState } from "../state";
import styles from "./styles.module.scss";

const validationSchema = yup.object({
  typeOfService: yup.string().required("Izaberi tip usluge"),
  customer: yup.object().required("Izaberi musteriju").nullable(),
  startTime: yup.string().required("Pocetno vreme je obavezno"),
});

interface NewReservation {
  customer: User | null;
  startTime: string;
  typeOfService: TypeOfService;
  worker: number | undefined | null;
}

interface ReservationFormProps {
  onSuccess?: (data: Reservation) => void;
  onClose: () => void;
}
const ReservationForm: FC<ReservationFormProps> = ({ onSuccess, onClose }) => {
  const queryClient = useQueryClient();

  const date = useRecoilValue(dateState);
  const [worker, setWorker] = useRecoilState(workerState);
  const [editReservation, setEditReservation] = useRecoilState(editState);

  const form = useRef<FormikProps<NewReservation>>(null);
  const [showUserForm, setShowUserForm] = useState(false);
  const [apiError, setApiError] = useState(false);

  const initialValues = (): NewReservation => {
    if (editReservation) {
      return {
        customer: editReservation.customer,
        startTime: dayjs(editReservation.date).format("HH:mm"),
        typeOfService: editReservation.typeOfService,
        worker: editReservation.worker.id,
      };
    } else {
      return {
        customer: null,
        startTime: "12:00",
        typeOfService: TypeOfService.Haircut,
        worker: worker?.id,
      };
    }
  };

  const startSlots = generateSlots({
    ...slotsConfig,
    interval: 15,
  });

  // React-query (create or edit)
  const { mutate } = useMutation(
    (values: any, id?: number) => {
      return id ? putReservation(values, id) : createReservation(values);
    },
    {
      onSuccess: (res) => {
        const reservation = res.data;

        queryClient.invalidateQueries([
          "reservations",
          reservation.worker.id,
          date?.toISOString(),
        ]);
        setWorker(reservation.worker);
        onSuccess?.(reservation);
      },
      onError: () => {
        setApiError(true);
      },
    }
  );

  const onSubmit = (values: NewReservation) => {
    // Has to be +1 for dayjs
    const hour = Number(values.startTime.split(":")[0]) + 1;
    const minut = Number(values.startTime.split(":")[1]);

    const data = {
      customer: values.customer,
      date: dayjs(date).hour(hour).minute(minut).second(0).toISOString(),
      durationMinutes: 15,
      typeOfService: values.typeOfService,
      worker: workersData?.data.find((worker) => worker.id === values.worker),
    };

    if (editReservation) {
      return mutate({ ...data, id: editReservation.id });
    }

    return mutate(data);
  };

  const onUserFormChange = (user?: User) => {
    queryClient.invalidateQueries("customers");
    user && form.current?.setFieldValue("customer", user);
    setShowUserForm(false);
  };

  // Delete reservation
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

  const { data: workersData } = useQuery<CustomersResponse>(
    "workers",
    getWorkers
  );

  return (
    <>
      <div className={styles.container}>
        <div
          className={styles.userForm}
          style={{ visibility: showUserForm ? "visible" : "hidden" }}
        >
          <UserForm
            onBack={() => setShowUserForm(false)}
            onChange={onUserFormChange}
            role={ROLES.CUSTOMER}
            title="Kreiraj mušteriju"
          />
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
              <Box marginBottom={3}>
                <Field
                  component={TextField}
                  disabled={false}
                  label="Radnik"
                  name="worker"
                  select
                >
                  {workersData?.data.map((worker) => (
                    <MenuItem key={worker.id} value={worker.id}>
                      {worker.firstName} {worker.lastName}
                    </MenuItem>
                  ))}
                </Field>
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
                {editReservation ? "Sačuvaj izmene" : "Zakaži"}
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
