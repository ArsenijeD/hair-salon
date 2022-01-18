import { FC } from "react";
import { useQuery } from "react-query";

import isEmpty from "lodash/isEmpty";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

import Loading from "@/components/Loading";

import { getUserServices } from "api";

import PercentageForm from "@/components/PercentageForm";
import { LENGTH, TYPES_OF_SERVICE } from "lib/constants";

const Services: FC<{ workerId: number }> = ({ workerId }) => {
  const { data, isLoading } = useQuery(["userServices", workerId], () =>
    getUserServices(workerId)
  );
  const services = data?.data;

  if (isLoading) {
    return <Loading />;
  }

  if (!services || isEmpty(services)) {
    return <h1>Ne postoje usluge za ovog radnika</h1>;
  }

  return (
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
          {services.map((service) => (
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
                <PercentageForm
                  workerId={workerId}
                  serviceId={service.id}
                  percentage={service.percentage}
                ></PercentageForm>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Services;
