import { useEffect } from "react";

import type { NextPage } from "next";
import Head from "next/head";
import { useQuery } from "react-query";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Container,
} from "@mui/material";

import PercentageForm from "@/components/PercentageForm";

import { authState } from "@/components/AuthGuard/state";
import { workerState } from "@/components/Services/state";
import { getServices, getWorkers } from "api";
import styles from "./styles.module.scss";
import { LENGTH, TYPES_OF_SERVICE } from "lib/constants";

const Usluge: NextPage = () => {
  const authUser = useRecoilValue(authState);
  const [worker, setWorker] = useRecoilState(workerState);

  // Set default worker in select
  // useEffect(() => {
  //   authUser && setWorker(authUser.user);
  // }, [authUser, setWorker]);

  const {
    data: servicesData,
    isLoading: isLoadingServices,
    error,
  } = useQuery(["services", worker?.id], () => getServices(worker?.id || 0), {
    enabled: !!worker?.id,
  });

  const { data: workersData, isLoading: isLoadingWorkers } = useQuery(
    "workers",
    () => getWorkers()
  );

  useEffect(() => {
    workersData && setWorker(workersData.data[0]);
  }, [workersData, setWorker]);

  return (
    <Container>
      <Head>
        <title>Usluge</title>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Usluge</h1>

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

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Usluga</TableCell>
                <TableCell align="right">Cena</TableCell>
                <TableCell align="right">Duzina</TableCell>
                <TableCell align="right">Procenat</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {servicesData?.data.map((service) => (
                <TableRow
                  key={service.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {TYPES_OF_SERVICE[service.hairsalonService.name]}
                  </TableCell>
                  <TableCell align="right">
                    {service.hairsalonService.price}
                  </TableCell>
                  <TableCell align="right">
                    {LENGTH[service.hairsalonService.length]}
                  </TableCell>
                  <TableCell align="right">
                    {worker && (
                      <PercentageForm
                        workerId={worker.id}
                        serviceId={service.id}
                        percentage={service.percentage}
                      ></PercentageForm>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </main>
    </Container>
  );
};

export default Usluge;
