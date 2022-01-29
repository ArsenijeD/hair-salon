import { FC, useState } from "react";

import {
  Button,
  InputAdornment,
  Box,
  MenuItem,
  Typography,
  Alert,
} from "@mui/material";
import * as yup from "yup";
import { Field, Form, Formik } from "formik";
import { TextField } from "formik-mui";
import { useQuery, useMutation, useQueryClient } from "react-query";

import {
  createService,
  deleteService,
  getLengths,
  getTypesOfServices,
  updateService,
} from "api";

import { translateLength, translateTypeOfService } from "lib/helpers";
import { Service } from "lib/types";
import styles from "./styles.module.scss";
import { Construction } from "@mui/icons-material";

const validationSchema = yup.object({
  name: yup.string().required("Obavezno"),
  length: yup.string().required("Obavezno"),
  price: yup.number().required("Obavezno"),
});

interface ServiceForm {
  name: string;
  length: string;
  price: number;
  id?: number;
}

interface ServiceFormProps {
  onSuccess?: () => void;
  editService?: Service | null;
}

const ServiceForm: FC<ServiceFormProps> = ({ onSuccess, editService }) => {
  const queryClient = useQueryClient();
  const [apiError, setApiError] = useState(false);

  const { data: typesOfServicesData } = useQuery(
    "type-of-services",
    getTypesOfServices
  );
  const typesOfServices = typesOfServicesData?.data;

  const { data: lengthsData } = useQuery("lengths", getLengths);
  const lengths = lengthsData?.data;

  const initialValues = (): ServiceForm => {
    if (editService) {
      return editService;
    }
    return {
      name: "",
      length: "",
      price: 0,
    };
  };

  // Update
  const { mutate: handleSubmit } = useMutation(
    (values: any) => {
      if (!!editService) {
        return updateService(values, editService.id);
      }
      return createService(values);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("services");
        onSuccess?.();
      },
      onError: () => {
        setApiError(true);
      },
    }
  );

  return (
    <div className={styles.container}>
      {apiError && (
        <Alert
          sx={{ mb: 1 }}
          severity="error"
          onClose={() => setApiError(false)}
        >
          Greška, usluga već postoji
        </Alert>
      )}
      <Typography variant="h4" sx={{ mb: 4 }}>
        {!!editService ? "Izmeni uslugu" : "Dodaj uslugu"}
      </Typography>
      <Formik
        initialValues={initialValues()}
        validationSchema={validationSchema}
        onSubmit={(values) => handleSubmit(values)}
      >
        {() => (
          <Form className={styles.form}>
            <Box marginBottom={3}>
              {typesOfServices && (
                <Field
                  component={TextField}
                  disabled={false}
                  label="Ime usluge"
                  name="name"
                  InputProps={{
                    sx: { minWidth: 200 },
                  }}
                  Form
                  select
                >
                  {typesOfServices.map((type) => (
                    <MenuItem key={type} value={type}>
                      {translateTypeOfService(type)}
                    </MenuItem>
                  ))}
                </Field>
              )}
            </Box>

            <Box marginBottom={3}>
              {lengths && (
                <Field
                  component={TextField}
                  disabled={false}
                  label="Duzina"
                  name="length"
                  InputProps={{
                    sx: { minWidth: 200 },
                  }}
                  select
                >
                  {lengths.map((length) => (
                    <MenuItem key={length} value={length}>
                      {translateLength(length)}
                    </MenuItem>
                  ))}
                </Field>
              )}
            </Box>

            <Box marginBottom={3}>
              <Field
                component={TextField}
                name="price"
                label="Cena"
                InputProps={{
                  sx: { width: 150 },
                  endAdornment: (
                    <InputAdornment position="end">din</InputAdornment>
                  ),
                }}
              ></Field>
            </Box>

            <Button
              size="large"
              color="primary"
              variant="contained"
              type="submit"
              sx={{ mr: 2, minWidth: 200 }}
            >
              {!!editService ? "Izmeni" : "Kreiraj"}
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ServiceForm;
