import { FC } from "react";

import { useField } from "formik";
import { Autocomplete, TextField, Box } from "@mui/material";

import { useQuery } from "react-query";
import { getCustomers } from "api";
import { CustomersResponse } from "lib/types";
import styles from "./styles.module.scss";

interface CustomerSelectProps {
  className?: string;
  id?: string;
  label?: string;
  name: string;
}

const CustomerSelect: FC<CustomerSelectProps> = ({
  className,
  id,
  label,
  name,
  ...props
}) => {
  const [field, { error, touched }, { setValue }] = useField(name);

  const {
    data,
    isLoading,
    error: dataError,
  } = useQuery<CustomersResponse>("customers", getCustomers);

  return (
    <Autocomplete
      onChange={(_, value) => setValue(value)}
      disablePortal
      id="customer-select"
      options={data?.data || []}
      sx={{ width: 350 }}
      getOptionLabel={(option) =>
        `${option.firstName} ${option.firstName}, ${option.phoneNumber}`
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
          {...props}
          error={!!error}
          helperText={!!error && touched && error}
          value={params?.value?.firstName}
          label={label}
        />
      )}
    />
  );
};

export default CustomerSelect;
