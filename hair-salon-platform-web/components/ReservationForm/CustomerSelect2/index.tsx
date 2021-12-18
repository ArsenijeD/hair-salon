import { FC } from "react";

import { TextField, Autocomplete, Box } from "@mui/material";
import { fieldToTextField, TextFieldProps } from "formik-mui";
import { FieldProps } from "formik";

interface Props extends FieldProps {
  textFieldProps: TextFieldProps;
}

const FormikAutocomplete: FC<Props> = ({ textFieldProps, ...props }) => {
  const {
    form: { setTouched, setFieldValue },
  } = props;
  const { error, helperText, ...field } = fieldToTextField(props);
  const { name } = field;

  return (
    <Autocomplete
      {...props}
      {...field}
      sx={{ width: 350 }}
      onChange={(_, value) => setFieldValue(name || "", value)}
      onBlur={() => setTouched({ [name || ""]: true })}
      renderInput={(props) => (
        <TextField
          {...props}
          {...textFieldProps}
          helperText={helperText}
          error={error}
        />
      )}
    />
  );
};

export default FormikAutocomplete;
