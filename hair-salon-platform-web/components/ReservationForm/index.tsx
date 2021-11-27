import { FC, useState } from "react";

import { Typography, Button, MenuItem, Box } from "@mui/material";
import { Field, Form, Formik } from "formik";
import { TextField } from "formik-mui";
import * as yup from "yup";
import { useQueryClient, useMutation } from "react-query";
import { Dayjs } from "dayjs";
import CustomerSelect from "./CustomerSelect";
import UserForm from "../UserForm";

import { createReservation } from "api";
import { useAuth } from "lib/hooks";
import { generateSlots } from "lib/helpers";
import { slotsConfig, TypeOfService } from "lib/constants";
import { Reservation, User } from "lib/types";
import dayjs from "lib/dayjs";
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

interface NewReservation {
  customer: User | null;
  startTime: string;
  endTime: string;
  typeOfService: string;
  worker: string;
}
const ReservationForm: FC<{ date: Dayjs | null }> = ({ date }) => {
  const [showUserForm, setShowUserForm] = useState(false);
  const authUser = useAuth();
  const queryClient = useQueryClient();

  const initialValues: NewReservation = {
    customer: null,
    startTime: "12:00",
    endTime: "15:00",
    typeOfService: "HAIRCUT",
    worker: "",
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
      },
    }
  );

  const onSubmit = (values: NewReservation) => {
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
      worker: authUser,
    };

    mutate(data);
  };

  const onUserFormChange = () => {
    setShowUserForm(false);
  };

  return (
    <div className={styles.container}>
      {showUserForm ? (
        <UserForm onChange={onUserFormChange} />
      ) : (
        <>
          <Typography variant="h4">Nova rezervacija</Typography>
          <Typography variant="h6" sx={{ marginBottom: 2 }}>
            {date?.format("dddd, DD.MM.YYYY")}
          </Typography>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ values, handleChange, isSubmitting, isValid }) => (
              <Form className={styles.form}>
                <Box mb={3}>
                  <Button
                    sx={{ mb: 2 }}
                    variant="outlined"
                    onClick={() => setShowUserForm(true)}
                  >
                    Dodaj novu musteriju
                  </Button>
                  <CustomerSelect name="customer" label="Izaberi musteriju" />
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
                    label="Pocetak"
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
                </Box>

                <Box marginBottom={2}>
                  <Field
                    component={TextField}
                    select
                    disabled={false}
                    label="Tip usluge"
                    name="typeOfService"
                  >
                    <MenuItem value={TypeOfService.HAIRCUT}>Sisanje</MenuItem>
                    <MenuItem value={TypeOfService.SHAVING}>Brijanje</MenuItem>
                    <MenuItem value={TypeOfService.NAILS}>Nokti</MenuItem>
                  </Field>
                </Box>

                <Button
                  size="large"
                  color="primary"
                  variant="contained"
                  fullWidth
                  type="submit"
                >
                  Kreiraj
                </Button>
              </Form>
            )}
          </Formik>
        </>
      )}
    </div>
  );
};

export default ReservationForm;
