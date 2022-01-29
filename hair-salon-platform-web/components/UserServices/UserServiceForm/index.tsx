import { FC, useState } from "react";

import {
  Button,
  InputAdornment,
  Box,
  MenuItem,
  Typography,
  Alert,
} from "@mui/material";
import { useRecoilState, useRecoilValue } from "recoil";
import * as yup from "yup";
import { Field, Form, Formik } from "formik";
import { TextField } from "formik-mui";
import { useQuery, useMutation, useQueryClient } from "react-query";

import {
  excludeServicesState,
  workerState,
} from "@/components/UserServices/state";

import { createUserService, getServices, getWorkers } from "api";
import { translateLength, translateTypeOfService } from "lib/helpers";
import styles from "./styles.module.scss";

const validationSchema = yup.object({
  percentage: yup.number().required("Obavezno polje 1-100"),
});

interface ServiceForm {
  percentage: number;
  user: number | null | undefined;
  hairsalonService: number | null | undefined;
}

interface ServiceFormProps {
  onSuccess?: () => void;
}

const UserServiceForm: FC<ServiceFormProps> = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  const [worker, setWorker] = useRecoilState(workerState);
  const excludeServices = useRecoilValue(excludeServicesState);
  const [apiError, setApiError] = useState(false);

  const { data: servicesData } = useQuery("services", () => getServices());

  console.log(servicesData);
  // Don't show allready defined ones
  const services = servicesData?.data.filter(
    (service) => !excludeServices.includes(service.id)
  );

  const { data: workersData } = useQuery("workers", getWorkers);
  const workers = workersData?.data;

  const initialValues = (): ServiceForm => ({
    percentage: 0,
    user: worker?.id,
    hairsalonService: services?.[0]?.id,
  });

  // Update
  const { mutate } = useMutation((values: any) => createUserService(values), {
    onSuccess: (res) => {
      const newService = res.data;
      queryClient.invalidateQueries(["userServices", newService.user.id]);
      onSuccess?.();
    },
    onError: () => {
      setApiError(true);
    },
  });

  const handleSubmit = (values: ServiceForm) => {
    const data = {
      ...values,
      hairsalonService: services?.find(
        (service) => service.id === values.hairsalonService
      ),
      user: workers?.find((worker) => worker.id === values.user),
    };

    mutate(data);
  };

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
        Dodaj uslugu
      </Typography>
      <Formik
        initialValues={initialValues()}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form className={styles.form}>
            <Box marginBottom={3}>
              {workers && (
                <Field
                  component={TextField}
                  disabled={false}
                  label="Radnik"
                  name="user"
                  InputProps={{
                    sx: { minWidth: 250 },
                  }}
                  Form
                  select
                >
                  {workers.map((worker) => (
                    <MenuItem key={worker.id} value={worker.id}>
                      {worker.firstName} {worker.lastName}
                    </MenuItem>
                  ))}
                </Field>
              )}
            </Box>

            <Box marginBottom={3}>
              {services && (
                <Field
                  component={TextField}
                  disabled={false}
                  label="Usluga"
                  name="hairsalonService"
                  InputProps={{
                    sx: { minWidth: 250 },
                  }}
                  select
                >
                  {services.map((service) => (
                    <MenuItem key={service.id} value={service.id}>
                      {translateTypeOfService(service.name)},{" "}
                      {translateLength(service.length)}
                    </MenuItem>
                  ))}
                </Field>
              )}
            </Box>

            <Box marginBottom={3}>
              <Field
                component={TextField}
                name="percentage"
                label="Unesi procenat"
                InputProps={{
                  sx: { width: 150 },
                  endAdornment: (
                    <InputAdornment position="end">%</InputAdornment>
                  ),
                }}
                autoFocus
              ></Field>
            </Box>

            <Button
              size="large"
              color="primary"
              variant="contained"
              type="submit"
              sx={{ mr: 2, minWidth: 200 }}
            >
              Dodaj
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default UserServiceForm;
