import { useState } from "react";
import {
  Typography,
  Paper,
  Grid,
  TextField,
  Button,
  Snackbar,
} from "@mui/material";
import * as yup from "yup";
import { useFormik } from "formik";
import { useMutation } from "react-query";

import { loginUser } from "api";
import { Auth, LoginData, TokenDecoded } from "lib/types";
import styles from "./styles.module.scss";
import { useSetRecoilState } from "recoil";
import { authState } from "@/components/AuthGuard/state";
import jwtDecode from "jwt-decode";

const validationSchema = yup.object({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

const Auth = () => {
  const [showError, setShowError] = useState(false);
  const setAuth = useSetRecoilState(authState);

  // React-query client
  const { mutate } = useMutation(
    "login",
    (data: LoginData) => loginUser(data),
    {
      onSuccess: (res) => {
        const tokenData = jwtDecode(res.data.jwt) as TokenDecoded;
        setAuth((oldAuth: Auth) => ({
          ...oldAuth,
          decoded: tokenData,
          jwt: res.data.jwt,
        }));
        localStorage.setItem("userToken", res.data.jwt);
      },
      onError: (error) => {
        setShowError(!!error);
      },
    }
  );

  const formik = useFormik<LoginData>({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      mutate(values);
    },
  });

  return (
    <>
      <Grid
        alignContent="center"
        className={styles.container}
        container
        justifyContent="center"
      >
        <Paper sx={{ maxWidth: 600, p: 4 }}>
          <Typography variant="h2" gutterBottom>
            Prijavite se
          </Typography>
          <form className={styles.form} onSubmit={formik.handleSubmit}>
            <TextField
              error={formik.touched.username && Boolean(formik.errors.username)}
              helperText={formik.touched.username && formik.errors.username}
              label="Korisničko ime"
              name="username"
              onChange={formik.handleChange}
              value={formik.values.username}
              margin="normal"
            />
            <TextField
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              label="Šifra"
              name="password"
              onChange={formik.handleChange}
              type="password"
              value={formik.values.password}
              margin="normal"
            />
            <Button color="primary" variant="contained" fullWidth type="submit">
              Prijavi se
            </Button>
          </form>
        </Paper>
      </Grid>
      <Snackbar
        open={showError}
        onClose={() => setShowError(false)}
        autoHideDuration={2000}
        message={"Greska!"}
      />
    </>
  );
};

export default Auth;
