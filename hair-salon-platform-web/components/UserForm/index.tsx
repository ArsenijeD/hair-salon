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
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { Field, Form, Formik } from "formik";
import { TextField, RadioGroup } from "formik-mui";
import { DatePicker } from "formik-mui-lab/";
import * as yup from "yup";
import { useMutation, useQueryClient } from "react-query";
import { ArrowBack } from "@mui/icons-material";

import { NewUser } from "lib/types";
import { UserRole } from "lib/constants";
import { createUser } from "api";
import styles from "./styles.module.scss";

const validationSchema = yup.object({});

interface UserFormProps {
  onChange: () => void;
}

const UserForm: FC<UserFormProps> = ({ onChange }) => {
  const queryClient = useQueryClient();
  // React-query client
  const { mutate } = useMutation(
    (values: NewUser) => {
      return createUser(values);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("customers");
      },
    }
  );

  const initialValues: NewUser = {
    dateOfBirth: "12.02.1994",
    firstName: "",
    gender: "",
    lastName: "",
    phoneNumber: "",
    userAuthorities: [{ id: 4, name: UserRole.CUSTOMER }],
    username: "",
  };

  return (
    <>
      <IconButton onClick={onChange}>
        <ArrowBack />
      </IconButton>
      <Typography variant="h4">Kreiraj musteriju</Typography>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => mutate(values)}
      >
        {({ values, handleChange, isSubmitting, isValid }) => (
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

            <LoadingButton
              loading={isSubmitting}
              size="large"
              color="primary"
              variant="contained"
              fullWidth
              type="submit"
            >
              Kreiraj
            </LoadingButton>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default UserForm;
