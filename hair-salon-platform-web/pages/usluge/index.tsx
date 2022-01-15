import { useEffect, useState } from "react";

import type { NextPage } from "next";
import Head from "next/head";
import { useQuery } from "react-query";
import { useRecoilState } from "recoil";
import {
  MenuItem,
  Select,
  Container,
  Grid,
  Typography,
  Button,
  Drawer,
} from "@mui/material";

import Services from "@/components/Services";

import { workerState } from "@/components/Services/state";
import { getWorkers } from "api";
import styles from "./styles.module.scss";
import ServiceForm from "@/components/Services/ServiceForm";

const Usluge: NextPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [worker, setWorker] = useRecoilState(workerState);

  const { data: workersData, isLoading: isLoadingWorkers } = useQuery(
    "workers",
    () => getWorkers()
  );

  useEffect(() => {
    workersData && !worker && setWorker(workersData.data[0]);
  }, [workersData, worker, setWorker]);

  return (
    <>
      <Container>
        <Head>
          <title>Usluge</title>
        </Head>

        <main className={styles.main}>
          <Grid
            container
            sx={{ justifyContent: "space-between", mb: 2, mt: 3 }}
          >
            <Grid item>
              <Typography variant="h4">Usluge</Typography>
            </Grid>
            <Grid item>
              {workersData && worker && (
                <Select
                  disabled={isLoadingWorkers}
                  classes={{ outlined: styles.workerSelect }}
                  placeholder="Izaberi osobu"
                  variant="outlined"
                  onChange={(e) =>
                    setWorker(
                      workersData?.data.find(
                        (worker) => worker.id === Number(e.target.value)
                      ) ?? null
                    )
                  }
                  value={worker.id}
                >
                  {workersData?.data.map((worker) => (
                    <MenuItem key={worker.id} value={worker.id}>
                      {worker.firstName} {worker.lastName}
                    </MenuItem>
                  ))}
                </Select>
              )}
              <Button
                sx={{ ml: 2 }}
                variant="contained"
                onClick={() => setShowForm(true)}
              >
                Dodaj uslugu
              </Button>
            </Grid>
          </Grid>

          {worker?.id && <Services workerId={worker.id} />}
        </main>
      </Container>
      <Drawer anchor="right" open={showForm} onClose={() => setShowForm(false)}>
        <ServiceForm />
      </Drawer>
    </>
  );
};

export default Usluge;
