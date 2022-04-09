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
import { useRecoilState, useRecoilValue } from "recoil";
import { Field, Form, Formik, FormikProps } from "formik";
import { TextField, Autocomplete } from "formik-mui";
import * as yup from "yup";
import { useQueryClient, useMutation, useQuery } from "react-query";

import UserForm from "../../Users/UserForm";

import { authState } from "@/components/AuthGuard/state";
import {
  getCustomers,
  getWorkers,
  getUserServices,
  createFinalizedServices,
  updateFinalizedServices,
} from "api";
import { TYPES_OF_SERVICE, ROLES, LENGTH } from "lib/constants";
import { User, CustomersResponse, FinalizedService } from "lib/types";
import { dateState, editState, workerState } from "../state";
import styles from "./styles.module.scss";

const validationSchema = yup.object({
  userHairsalonService: yup.number().required("Izaberi uslugu").nullable(),
  customer: yup.object().required("Izaberi musteriju").nullable(),
});

interface FinalizedServiceForm {
  customer: User | null;
  userHairsalonService: number | undefined | null;
  worker: number | undefined | null;
}

interface ReservationFormProps {
  onSuccess?: (data: FinalizedService) => void;
  onClose: () => void;
}
const ReservationForm: FC<ReservationFormProps> = ({ onSuccess, onClose }) => {
  const queryClient = useQueryClient();

  const date = useRecoilValue(dateState);
  const [worker, setWorker] = useRecoilState(workerState);
  const [editFinalizedService, setEditReservation] = useRecoilState(editState);
  const { isAdmin } = useRecoilValue(authState);

  const form = useRef<FormikProps<FinalizedServiceForm>>(null);
  const [showUserForm, setShowUserForm] = useState(false);
  const [apiError, setApiError] = useState(false);

  // Get data
  const { data: customersData } = useQuery<CustomersResponse>(
    "customers",
    getCustomers
  );
  const { data: workersData } = useQuery<CustomersResponse>(
    "workers",
    getWorkers
  );
  const { data: userServiceData } = useQuery(["userServices", worker?.id], () =>
    getUserServices(worker?.id || 1)
  );

  const initialValues = (): FinalizedServiceForm => {
    if (editFinalizedService) {
      return {
        customer: editFinalizedService.customer,
        userHairsalonService: editFinalizedService.userHairsalonService.id,
        worker: worker?.id,
      };
    } else {
      return {
        customer: null,
        userHairsalonService: null,
        worker: worker?.id,
      };
    }
  };

  // React-query (create or edit)
  const { mutate } = useMutation(
    (values: any, id?: number) => {
      return id
        ? updateFinalizedServices(values)
        : createFinalizedServices(values);
    },
    {
      onSuccess: (res) => {
        const finalizedService = res.data;

        queryClient.invalidateQueries([
          "finalized-services",
          worker?.id,
          date?.toISOString(),
        ]);

        onSuccess?.(finalizedService);
      },
      onError: () => {
        setApiError(true);
      },
    }
  );

  const onSubmit = (values: FinalizedServiceForm) => {
    const data = {
      customer: values.customer,
      date: date?.toISOString(),
      userHairsalonService: userServiceData?.data.find(
        (a) => a.id === values.userHairsalonService
      ),
    };

    if (editFinalizedService) {
      return mutate({ ...data, id: editFinalizedService.id });
    }

    return mutate(data);
  };

  const onUserFormChange = (user?: User) => {
    queryClient.invalidateQueries("customers");
    user && form.current?.setFieldValue("customer", user);
    setShowUserForm(false);
  };

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
          {editFinalizedService ? "Izmeni podatke" : "Realizovana usluga"}
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
              {isAdmin && (
                <Box marginBottom={3}>
                  <Field
                    component={TextField}
                    sx={{ minWidth: 200 }}
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
              )}
              <Box marginBottom={3}>
                <Field
                  sx={{ minWidth: 200 }}
                  component={TextField}
                  select
                  disabled={false}
                  label="Izaberi uslugu"
                  name="userHairsalonService"
                >
                  {userServiceData?.data.map((userService) => (
                    <MenuItem key={userService.id} value={userService.id}>
                      {TYPES_OF_SERVICE[userService.hairsalonService.name]} -{" "}
                      {LENGTH[userService.hairsalonService.length]}
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
                {editFinalizedService ? "Sačuvaj izmene" : "Kreiraj"}
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default ReservationForm;
