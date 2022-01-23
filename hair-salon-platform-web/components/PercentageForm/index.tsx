import { FC, useState } from "react";

import { useMutation, useQueryClient } from "react-query";
import { Form, Formik, Field } from "formik";
import { TextField } from "formik-mui";
import {
  Box,
  Button,
  Card,
  Input,
  InputAdornment,
  Popover,
} from "@mui/material";

import { updateUserService } from "api";

interface PercentageFormProps {
  percentage: number;
  serviceId: number;
  workerId: number;
}

interface FormValues {
  percentage: number;
}

const PercentageForm: FC<PercentageFormProps> = ({
  percentage,
  serviceId,
  workerId,
}) => {
  const [ref, setRef] = useState<HTMLInputElement | null>(null);
  const queryClient = useQueryClient();
  const [apiError, setApiError] = useState(false);
  const initalValues: FormValues = {
    percentage: percentage,
  };

  // React-query
  const { mutate } = useMutation(
    (values: FormValues) => {
      return updateUserService(values, workerId, serviceId);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["userServices", workerId]);
        setRef(null);
      },
      onError: () => {
        setApiError(true);
      },
    }
  );

  const handleSubmit = (values: FormValues) => {
    mutate(values);
  };

  return (
    <>
      <Popover open={!!ref} anchorEl={ref} onClose={() => setRef(null)}>
        <Card sx={{ p: 2 }}>
          <Formik initialValues={initalValues} onSubmit={handleSubmit}>
            <Form>
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

              <Box sx={{ mt: 2 }}>
                <Button
                  sx={{ mr: 2 }}
                  onClick={() => {
                    setRef(null);
                  }}
                >
                  Otkaži
                </Button>
                <Button type="submit" variant="contained">
                  Izmeni
                </Button>
              </Box>
            </Form>
          </Formik>
        </Card>
      </Popover>
      <Input
        endAdornment={<InputAdornment position="end">%</InputAdornment>}
        onClick={(e) => setRef(e.currentTarget as HTMLInputElement)}
        sx={{ width: 150 }}
        value={percentage}
      />
    </>
  );
};

export default PercentageForm;
