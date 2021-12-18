import { FC, useEffect } from "react";

import { useField } from "formik";
import { Autocomplete, TextField, Box, Button } from "@mui/material";

import { useQuery } from "react-query";
import { getCustomers } from "api";
import { CustomersResponse, User } from "lib/types";

interface CustomerSelectProps {
  className?: string;
  id?: string;
  label?: string;
  name: string;
  newValue: User | null;
  setFieldValue?: (field: string, value: any, shouldValidate?: boolean) => void;
}

const CustomerSelect: FC<CustomerSelectProps> = ({ label, name, newValue }) => {
  const [field, { error, touched }, { setValue }] = useField<User | null>(name);

  const { data, isLoading } = useQuery<CustomersResponse>(
    "customers",
    getCustomers
  );

  useEffect(() => {
    // Override exisiting
    if (newValue && field.value) {
      if (newValue.id !== field.value.id) {
        setValue(newValue);
      }
    }
    // Set new value
    if (!field.value) {
      newValue && setValue(newValue);
    }
  }, [newValue, setValue, field, data]);

  return (
    <>
      <Autocomplete
        onChange={(_, value) => setValue(value)}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        defaultValue={field.value}
        disabled={isLoading}
        disablePortal
        id="customer-select"
        options={data?.data || []}
        sx={{ width: 350 }}
        getOptionLabel={(option) =>
          `${option.firstName} ${option.lastName}, ${option.phoneNumber}`
        }
        renderOption={(props, option) => {
          return (
            <Box component="li" {...props}>
              {option.firstName} {option.lastName} <br /> {option.phoneNumber}
            </Box>
          );
        }}
        renderInput={(params: any) => (
          <TextField
            {...params}
            {...field}
            error={!!error && touched}
            helperText={!!error && touched && error}
            label={label}
          />
        )}
      />
      <Button onClick={() => setValue(newValue)}>TEst</Button>
    </>
  );
};

export default CustomerSelect;
