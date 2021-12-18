import { FC } from "react";

import {
  Typography,
  Box,
  IconButton,
  Radio,
  FormControlLabel,
  FormControl,
  InputAdornment,
  FormLabel,
  Button,
} from "@mui/material";
import { Field, Form, Formik } from "formik";
import { TextField, RadioGroup } from "formik-mui";
import { DatePicker } from "formik-mui-lab/";
import * as yup from "yup";
import { useMutation, useQueryClient } from "react-query";
import { ArrowBack } from "@mui/icons-material";

import { NewUser, User } from "lib/types";
import { UserRole } from "lib/constants";
import { createUser } from "api";
import styles from "./styles.module.scss";
import dayjs from "lib/dayjs";

const validationSchema = yup.object({
  dateOfBirth: yup.date(),
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  username: yup.string().required(),
  phoneNumber: yup.string().required(),
});

interface UserFormProps {
  onChange: (user?: User) => void;
}

const UserForm: FC<UserFormProps> = ({ onChange }) => {
  const queryClient = useQueryClient();
  // React-query client
  const { mutate, isLoading } = useMutation(
    (values: NewUser) => {
      const data = {
        ...values,
        dateOfBirth: dayjs(values.dateOfBirth).toISOString(),
      };
      return createUser(data);
    },
    {
      onSuccess: (res) => {
        queryClient.invalidateQueries("customers");
        onChange(res.data);
      },
    }
  );

  const initialValues: NewUser = {
    dateOfBirth: "12.02.1994",
    firstName: "",
    gender: "",
    lastName: "",
    phoneNumber: "",
    userAuthorities: [{ id: 4, name: UserRole.Customer }],
    username: "",
  };

  return (
    <>
      <IconButton onClick={() => onChange()}>
        <ArrowBack />
      </IconButton>
      <Typography variant="h4">Kreiraj musteriju</Typography>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => mutate(values)}
      >
        <Form className={styles.form}>
          <Box marginBottom={2}>
            <Field
              component={TextField}
              disabled={false}
              label="Korisnicko ime"
              name="username"
            />
          </Box>

          <Box
            marginBottom={2}
            sx={{
              "& > :not(style)": { mr: 1, width: "150px" },
            }}
          >
            <Field
              component={TextField}
              disabled={false}
              label="Ime"
              name="firstName"
            />
            <Field
              component={TextField}
              disabled={false}
              label="Prezime"
              name="lastName"
            />
          </Box>

          <Box marginBottom={2}>
            <Field
              component={TextField}
              disabled={false}
              label="Telefon"
              name="phoneNumber"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">+381</InputAdornment>
                ),
              }}
            />
          </Box>

          <Box marginBottom={3}>
            <Field
              component={DatePicker}
              inputFormat="DD.MM.YYYY"
              disabled={false}
              label="Datum rođenja"
              name="dateOfBirth"
              mask="__.__.____"
            />
          </Box>

          <Box marginBottom={2}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Pol</FormLabel>
              <Field
                component={RadioGroup}
                disabled={false}
                label="Pol"
                name="gender"
              >
                <FormControlLabel
                  value="FEMALE"
                  control={<Radio />}
                  label="Zenski"
                />
                <FormControlLabel
                  value="MALE"
                  control={<Radio />}
                  label="Muski"
                />
              </Field>
            </FormControl>
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
      </Formik>
    </>
  );
};

export default UserForm;
