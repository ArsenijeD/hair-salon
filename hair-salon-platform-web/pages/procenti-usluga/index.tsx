import { useEffect, useState } from "react";

import type { NextPage } from "next";
import Head from "next/head";
import { useQuery } from "react-query";
import { useRecoilState } from "recoil";
import {
  MenuItem,
  Select,
  Container,
  Typography,
  Button,
  Drawer,
  Box,
} from "@mui/material";
import { Add } from "@mui/icons-material";

import Services from "@/components/UserServices";
import ServiceForm from "@/components/UserServices/UserServiceForm";

import { workerState } from "@/components/UserServices/state";
import { getWorkers } from "api";
import styles from "./styles.module.scss";

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
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexDirection: { xs: "column", sm: "row" },
              mb: 2,
              mt: 3,
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: { xs: "column", sm: "row" },
              }}
            >
              <Typography sx={{ mr: 2 }} variant="h4">
                Zarada Radnika
              </Typography>
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
            </Box>

            <Button
              sx={{ ml: 2 }}
              variant="contained"
              onClick={() => setShowForm(true)}
              endIcon={<Add />}
            >
              Dodaj uslugu
            </Button>
          </Box>

          {worker?.id && <Services workerId={worker.id} />}
        </main>
      </Container>
      <Drawer anchor="right" open={showForm} onClose={() => setShowForm(false)}>
        <ServiceForm onSuccess={() => setShowForm(false)} />
      </Drawer>
    </>
  );
};

export default Usluge;
