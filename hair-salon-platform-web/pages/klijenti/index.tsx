import { useState } from "react";

import type { NextPage } from "next";
import Head from "next/head";
import { Container, Grid, Typography, Button, Drawer } from "@mui/material";

import { useQuery, useQueryClient } from "react-query";

import UserForm from "@/components/Users/UserForm";

import { CustomersResponse } from "lib/types";
import { ROLES } from "lib/constants";
import { getCustomers } from "api";
import styles from "./styles.module.scss";
import UserTable from "@/components/Users/UserTable";

const Customers: NextPage = () => {
  const [showForm, setShowForm] = useState(false);
  const queryClient = useQueryClient();

  const { data: response } = useQuery<CustomersResponse>(
    "customers",
    getCustomers
  );
  const users = response?.data;

  const onUserFormChange = () => {
    queryClient.invalidateQueries("customers");
    setShowForm(false);
  };

  return (
    <>
      <div className={styles.container}>
        <Head>
          <title>Klijenti</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>
          <Container>
            <Grid
              container
              sx={{ justifyContent: "space-between", mb: 2, mt: 3 }}
            >
              <Grid item>
                <Typography variant="h4">Klijenti</Typography>
              </Grid>
              <Grid item>
                <Button variant="contained" onClick={() => setShowForm(true)}>
                  Dodaj klijenta
                </Button>
              </Grid>
            </Grid>

            {users && <UserTable users={users} />}
          </Container>
        </main>
      </div>

      <Drawer
        anchor="right"
        open={showForm}
        classes={{ paper: styles.userDrawer }}
        onClose={() => {
          setShowForm(false);
        }}
      >
        <UserForm
          onChange={onUserFormChange}
          role={ROLES.CUSTOMER}
          title="Novi klijent"
        />
      </Drawer>
    </>
  );
};

export default Customers;