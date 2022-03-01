import { FC, useRef } from "react";

import { Typography, Box, InputAdornment, Button } from "@mui/material";
import { Field, Form, Formik, FormikProps } from "formik";
import { TextField } from "formik-mui";
import * as yup from "yup";
import { useMutation } from "react-query";

import { NewMaterial, Material } from "lib/types";
import { createMaterial, updateMaterial } from "api";
import { useRecoilValue } from "recoil";
import { editState } from "@/components/Materials/state";
import styles from "./styles.module.scss";

interface MaterialFormProps {
  onChange: (user?: Material) => void;
}

const validationSchema = yup.object({
  brand: yup.string().required(),
  name: yup.string().required(),
  price: yup.number().required(),
  numberInStock: yup.number().required(),
});

const MaterialForm: FC<MaterialFormProps> = ({ onChange }) => {
  const form = useRef<FormikProps<NewMaterial>>();
  const editMaterial = useRecoilValue(editState);

  const initialValues = (): NewMaterial => {
    if (editMaterial) {
      return {
        brand: editMaterial.brand,
        name: editMaterial.name,
        numberInStock: editMaterial.numberInStock,
        price: editMaterial.price,
      };
    } else
      return {
        brand: "",
        name: "",
        numberInStock: 0,
        price: 0,
      };
  };

  // React-query client
  const { mutate } = useMutation(
    (values: NewMaterial) => {
      if (!!editMaterial) {
        const data: Material = {
          ...values,
          id: editMaterial.id,
        };
        return updateMaterial(data, editMaterial.id);
      }

      return createMaterial(values);
    },
    {
      onSuccess: (res) => {
        form.current?.resetForm();
        onChange(res.data);
      },
    }
  );

  return (
    <>
      <Typography variant="h4" sx={{ mb: 2 }}>
        {!!editMaterial ? "Izmeni podatke" : "Dodaj Materijal"}
      </Typography>
      <Formik
        initialValues={initialValues()}
        validationSchema={validationSchema}
        onSubmit={(values) => mutate(values)}
      >
        <Form className={styles.form}>
          <Box marginBottom={2}>
            <Field
              component={TextField}
              disabled={false}
              label="Ime"
              name="name"
            />
          </Box>

          <Box marginBottom={2}>
            <Field
              component={TextField}
              disabled={false}
              label="Brand"
              name="brand"
            />
          </Box>

          <Box marginBottom={2}>
            <Field
              component={TextField}
              disabled={false}
              label="Cena"
              name="price"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">din</InputAdornment>
                ),
              }}
            />
          </Box>

          <Box marginBottom={2}>
            <Field
              component={TextField}
              disabled={false}
              label="Lager"
              name="numberInStock"
            />
          </Box>

          <Button
            size="large"
            color="primary"
            variant="contained"
            fullWidth
            type="submit"
          >
            {editMaterial ? "Sacuvaj Izmene" : "Kreiraj"}
          </Button>
        </Form>
      </Formik>
    </>
  );
};

export default MaterialForm;
