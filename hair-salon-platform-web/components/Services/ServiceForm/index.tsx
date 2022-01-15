import { FC, useState } from "react";

import { Button, InputAdornment, Box } from "@mui/material";
import { useRecoilState } from "recoil";
import * as yup from "yup";
import { Field, Form, Formik } from "formik";
import { TextField } from "formik-mui";

import { TYPES_OF_SERVICE } from "lib/constants";
import { workerState } from "@/components/Services/state";
import { User } from "lib/types";

import styles from "./styles.module.scss";

const validationSchema = yup.object({
  percentage: yup.number().required("Obavezno polje 1-100"),
});

interface Service {
  percentage: number;
  user: User | null;
  hairsalonService: number;
}

const ServiceForm: FC = () => {
  const [worker, setWorker] = useRecoilState(workerState);
  const [showUserForm, setShowUserForm] = useState(false);
  const [apiError, setApiError] = useState(false);

  const initialValues: Service = {
    percentage: 0,
    user: worker,
    hairsalonService: 1,
  };

  return (
    <div className={styles.container}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {({ values, handleChange, isSubmitting, isValid, setFieldValue }) => (
          <Form className={styles.form}>
            {/* <Box marginBottom={3}>
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
            </Box> */}

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
              Kreiraj
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ServiceForm;
